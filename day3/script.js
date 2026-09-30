// Starting notes data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. Search notes
function searchNotes(word) {
  return notes.filter(note =>
    note.text.toLowerCase().includes(word.toLowerCase())
  );
}

// Tests
console.log(searchNotes("day"));
// Expected: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]

console.log(searchNotes("python"));
// Expected: []


// 2. Find the longest note
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (let note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }

  return longest;
}

// Tests
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

let savedNotes = notes;
notes = [];
console.log(longestNote());
// Expected: null
notes = savedNotes;


// 3. Count notes by category
function countByCategory() {
  let counts = {};

  for (let note of notes) {
    if (counts[note.category]) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  }

  return counts;
}

// Tests
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

let originalNotes = notes;
notes = [];
console.log(countByCategory());
// Expected: {}
notes = originalNotes;


// 4. Get notes summary
function getSummary() {
  let counts = countByCategory();
  let noteWord = notes.length === 1 ? "note" : "notes";

  return `${notes.length} ${noteWord}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}

// Tests
console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

let currentNotes = notes;
notes = [{ id: 6, text: "Test note", category: "personal" }];
console.log(getSummary());
// Expected: "1 note: 1 personal, 0 work, 0 study."
notes = currentNotes;


// 5. Check for duplicate notes
function isDuplicate(text) {
  let cleanedText = text.trim().toLowerCase();

  return notes.some(note =>
    note.text.trim().toLowerCase() === cleanedText
  );
}

// Tests
console.log(isDuplicate("  BUY MILK AND BREAD  "));
// Expected: true

console.log(isDuplicate("Buy eggs"));
// Expected: false


// 6. Add a new note
function addNote(text, category) {
  if (typeof text !== "string") {
    console.log("Note not added: text must be a string.");
    return false;
  }

  let cleanedText = text.trim();

  if (cleanedText.length < 1 || cleanedText.length > 200) {
    console.log("Note not added: text must be 1–200 characters.");
    return false;
  }

  if (isDuplicate(cleanedText)) {
    console.log("Note not added: duplicate note.");
    return false;
  }

  if (!["personal", "work", "study"].includes(category)) {
    console.log("Note not added: invalid category.");
    return false;
  }

  let newId = notes.length > 0
    ? Math.max(...notes.map(note => note.id)) + 1
    : 1;

  notes.push({
    id: newId,
    text: cleanedText,
    category: category
  });

  console.log("Note added successfully.");
  return true;
}

// Tests
console.log(addNote("Buy eggs", "personal"));
// Expected: true

console.log(addNote("  Buy milk and bread  ", "personal"));
// Expected: false (duplicate note)

console.log(addNote("", "study"));
// Expected: false (invalid length)

console.log(addNote("Learn JavaScript functions", "other"));
// Expected: false (invalid category)
