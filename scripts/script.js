console.log('Hello I am from JS');

const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((response) => response.json())
        .then((jsonData) => displayLessons(jsonData.data));
};

const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

//fetch word by level
const loadLevelWord = (id) =>{
        fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then((response) => response.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        });

};

const loadWordDetail = async (id) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/word/${id}`);
    const details = await response.json()
    displayWordDetails(details.data);
}
const displayWordDetails = (word) =>{
        console.log(word);
        const detailsContainer = document.getElementById("details-container");
        detailsContainer.innerHTML = `
        
        <div class="">
                    <h2>${word.word} (<i class="fa-solid fa-microphone"></i> :${word.pronunciation})</h2>
                </div>
                <div class="">
                     <h2 class="font-bold">Meaning</h2>
                     <p>${word.meaning}</p>
                </div>
                <div class="">
                     <h2 class="font-bold">Example</h2>
                     <p>${word.sentence}</p>
                </div>
                <div class="">
                    <h2>সমার্থক শব্দ গুলো</h2>
                    <span class="btn bg-[#1A91FF10]">${word.synonyms[0]}</span>
                    <span class="btn bg-[#1A91FF10]">${word.synonyms[1]}</span>
                    <span class="btn bg-[#1A91FF10]">${word.synonyms[2]}</span>
                </div>
        `;
        document.getElementById("my_modal_5").showModal();
}

const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
     if(words == ""){
          wordContainer.innerHTML = `
             <div class="font-bangla text-center col-span-full py-10 rounded-xl space-y-6">
              <img class="mx-auto" src="./assets/alert-error.png" alt="Error">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
          </div>
          `
     }
     else{
        words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word? word.word : "Word npt found"}</h2>
            <p class="font-semibold">Meaning /Pronunciation</p>
            <div class="font-medium text-2xl font-bangla">"${word.meaning? word.meaning : "Meaning not found"} / ${word.pronunciation? word.pronunciation : "Pronunciation not found"}"</div>
            <div class="flex justify-between items-center">
                 <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]" onclick="loadWordDetail(${word.id})"><i class="fa-solid fa-circle-info"></i></button>
                 <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>

        `;

        wordContainer.append(card);
     });
     }
}
//fetch all levels
const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
          <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open-reader"></i>
                                Lesson -${lesson.level_no}</button>
        `;

         levelContainer.append(btnDiv);
    }
   
}

loadLessons();