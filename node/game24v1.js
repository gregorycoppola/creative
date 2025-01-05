function solveGameOf24(nums) {
    const operations = [(a, b) => a + b, (a, b) => a - b, (a, b) => a * b, (a, b) => b !== 0 ? a / b : NaN];
  
    // Helper function to recursively try all combinations of operations and numbers
    function search(numbers) {
      if (numbers.length === 1) {
        // Check if the result is 24 (allowing a small error margin for division)
        if (Math.abs(numbers[0] - 24) < 1e-6) return true;
        return false;
      }
  
      for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
          if (i !== j) {
            const nextNumbers = numbers.filter((_, index) => index !== i && index !== j);
  
            for (let op of operations) {
              nextNumbers.push(op(numbers[i], numbers[j]));
              if (search(nextNumbers)) return true;
              nextNumbers.pop();
            }
          }
        }
      }
      return false;
    }
  
    return search(nums);
  }
  
  // Example usage:
  console.log(solveGameOf24([3, 3, 8, 8]));  // Should return true
  