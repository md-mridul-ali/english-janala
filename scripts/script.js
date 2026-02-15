console.log('Hello I am from JS');

const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((response) => response.json())
        .then((jsonData) => displayLessons(jsonData.data));
};
//fetch word by level
const loadLevelWord = (id) =>{
        fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then((response) => response.json())
        .then((data) => displayLevelWord(data.data));

};
const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
     words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
         <p>Cat</P>

        `;

        wordContainer.append(card);
     });
}
//fetch all levels
const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
          <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open-reader"></i>
                                Lesson -${lesson.level_no}</button>
        `;

         levelContainer.append(btnDiv);
    }
   
}

loadLessons();