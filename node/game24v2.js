function solveGameOf24(nums) {
    const operations = [
        { op: (a, b) => a + b, sign: '+' },
        { op: (a, b) => a - b, sign: '-' },
        { op: (a, b) => a * b, sign: '*' },
        { op: (a, b) => b !== 0 ? a / b : NaN, sign: '/' }
    ];

    // Helper function to recursively try all combinations of operations and numbers
    function search(numbers, trace) {
        if (numbers.length === 1) {
            // Check if the result is 24 (allowing a small error margin for division)
            if (Math.abs(numbers[0] - 24) < 1e-6) {
                console.log(`Solution found: ${trace[0]}`);
                return true;
            }
            return false;
        }

        for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < numbers.length; j++) {
                if (i !== j) {
                    const nextNumbers = numbers.filter((_, index) => index !== i && index !== j);
                    const nextTrace = trace.filter((_, index) => index !== i && index !== j);

                    for (let { op, sign } of operations) {
                        const result = op(numbers[i], numbers[j]);
                        const newTrace = `(${trace[i]} ${sign} ${trace[j]})`;
                        nextNumbers.push(result);
                        nextTrace.push(newTrace);
                        if (search(nextNumbers, nextTrace)) return true;
                        nextNumbers.pop();
                        nextTrace.pop();
                    }
                }
            }
        }
        return false;
    }

    return search(nums, nums.map(String));
}

// Example usage:
console.log(solveGameOf24([3, 3, 8, 8]));  // Should return true and print the operations
