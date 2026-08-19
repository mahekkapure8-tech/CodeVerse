const questions =[
    {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    description: "Find two numbers whose sum equals the target.",
    exampleInput: "nums = [2,7,11,15], target = 9",
  exampleOutput: "[0,1]",
  hint: "Use a HashMap to store visited numbers."
  
  },
  {
    id: 2,
    title: "Reverse String",
    difficulty: "Easy",
    category: "Strings",
    description: "Reverse a given string.",
    exampleInput: 's = ["h","e","l","l","o"]',
exampleOutput: '["o","l","l","e","h"]',
    hint: "Try swapping the first and last characters, then move toward the center."
  },
  {
    id: 3,
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Arrays",
    description: "Merge all overlapping intervals.",
    exampleInput: "[[1,3],[2,6],[8,10],[15,18]]",

exampleOutput: "[[1,6],[8,10],[15,18]]",
    hint: "Sort the intervals first, then merge overlapping ones."
  },
  {
    id: 4,
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Graphs",
    description: "Find the shortest transformation sequence.",
    exampleInput: 's = "()[]{}"',

exampleOutput: "true",

hint: "Use a Stack. Push opening brackets and pop when matching closing brackets appear."
  }
];

export default questions;
   