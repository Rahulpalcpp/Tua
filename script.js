const form = document.getElementById('quiz-form');
const scoreResult = document.getElementById('score-result');
const questionBoxes = document.querySelectorAll('.question-box');
const totalQuestions = 20;

// Function to handle immediate feedback on selection
questionBoxes.forEach(box => {
    const radios = box.querySelectorAll('input[type="radio"]');
    const correctValue = box.getAttribute('data-correct');

    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Check if this box has already been attempted
            if (box.getAttribute('data-attempted') === 'true') {
                return;
            }
            
            // Mark question as attempted to lock it
            box.setAttribute('data-attempted', 'true');
            
            const selectedLabel = this.closest('label');

            // 1. Give immediate feedback (color change)
            if (this.value === correctValue) {
                selectedLabel.classList.add('correct');
            } else {
                selectedLabel.classList.add('incorrect');
                
                // 2. Reveal the correct answer (optional feedback)
                box.querySelectorAll('.option-label').forEach(otherLabel => {
                    const otherRadio = otherLabel.querySelector('input');
                    if (otherRadio.value === correctValue) {
                        otherLabel.classList.add('correct');
                    }
                });
            }

            // 3. Disable all radios in this box after one selection
            radios.forEach(r => r.disabled = true);
        });
    });
});

// Function to calculate and show final score on submit
form.addEventListener('submit', function(event) {
    event.preventDefault();
    let score = 0;
    let attemptedCount = 0;

    questionBoxes.forEach((box, index) => {
        const questionName = `q${index + 1}`;
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        const correctValue = box.getAttribute('data-correct');

        if (selectedOption) {
            attemptedCount++;
            if (selectedOption.value === correctValue) {
                score++;
            }
        }
    });

    if (attemptedCount < totalQuestions) {
        alert(`आपने अभी तक ${totalQuestions - attemptedCount} प्रश्नों का उत्तर नहीं दिया है।`);
    }

    const percentage = ((score / totalQuestions) * 100).toFixed(2);
    scoreResult.innerHTML = `आपका कुल स्कोर: ${score} / ${totalQuestions} (${percentage}%) 🎉`;
    scoreResult.style.display = 'block';
    
    // Scroll to the bottom to show the score
    window.scrollTo(0, document.body.scrollHeight); 

    // Disable the submit button after one submission
    this.querySelector('.submit-btn').disabled = true;
    this.querySelector('.submit-btn').style.backgroundColor = '#757575';
    this.querySelector('.submit-btn').innerHTML = 'स्कोर सबमिट हो गया है';
});