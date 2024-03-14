const question = document.querySelector ('#question');
const choices = Array.from(document.querySelectorAll ('.choice-text'));
const scoreText = document.querySelector('#score');
const progressText = document.querySelector ('#progressText');
const progressBarFull = document.querySelector ('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
{
question: "Pada tanggal 30 September 1965 di Indonesian pernah terjadi pemberontakan yang mengakibatkan tewasnya tujuh jenderal terbaik waktu itu. Sebutkan apa nama gerakan tersebut?",
choice1: "DI / TII ",
choice2: "PKI",
choice3: "Papua Merdeka",
choice4: "Agresi Belanda 1",
answer: 2,
},

{
question: "Apa tujuan dan misi dari pemberontakan yang terjadi pada tanggal 30 September?",
choice1: "Ingin mengganti bendera merah putih dengan warna lain",
choice2: "Ingin terlepas dari NKRI",
choice3: "Mengganti ideologi Pancasila dengan ideologi Komunis",
choice4: "Ingin mendirikan negara Papua Merdeka",
answer: 3,
},

{
question: "Akhirnya pada tanggal 1 Oktober 1965 pemberontakan tersebut bisa diatasi, pemimpin dan anggotanya ditangkap. Maka setiap tanggal 1 Oktober diperingati sebagai hari ...",
choice1: "Kesaktian Pancasila",
choice2: "Lahirnya Pancasila",
choice3: "Pendidikan Nasional",
choice4: "Kebangkitan Nasional",
answer: 1,
},

{
question: "Untuk mengenang dan menghormati ketujuh jenderal yang menjadi korban pemberontakan PKI, dan bergelar adalah",
choice1: 'Pahlawan Nasiona',
choice2: 'Pahlawan Revolusi',
choice3: 'Pahlawan Tanpa Tanda Jasa',
choice4: 'Pahlawan Emansipasi Wanita',
answer: 2,
},

{
question: "59 tahun telah berlalu setelah pemberontakan G30S/PKI, apa usaha bangsa Indonesia dan kalian sebagai warga negara Indonesia supaya kejadian tersebut tidak terulang kembali?",
choice1: "Melaksanakan Pancasila secara murni dan konsekwen",
choice2: "Selalu melanggar peraturan lalu lintas",
choice3: "Tidak peduli sesama",
choice4: "Suka terlibat tawuran",
answer: 1,
},

{
    question: "Apa Kepanjangan G30S PKI?",
    choice1: "Gerakan 30 September Partai Kesehjateraan Indonesia",
    choice2: "Gerakan 30 September Partai Keadialan Indonesia",
    choice3: "Gerakan 30 September Partai Komunis Indonesia",
    choice4: "Gerakan 30 September Partai kemanusiaan Indonesi",
    answer: 3,
},
{
    question: "Dibawah ini nama-nama perwira TNI yang diculik, kecuali",
    choice1: "Brigjen Soetoyo",
    choice2: "Moh. Hatta",
    choice3: "Mayjen Soeprapto",
    choice4: "Jenderal Ahmad Yanii",
    answer: 2,
},
{
    question: "KUP pada peristiwa G30S PKI artinya?",
    choice1: "Pemilihan presiden",
    choice2: "Pengambilan kekuasaan secara paksa",
    choice3: "Pemindahan hak secara paksa",
    choice4: "Pemantauan kekuasaan",
    answer: 2,
},
{
    question: "Mayat-mayat jenderal yang dibunuh, dibuang di...",
    choice1: "Lubang Buaya",
    choice2: "Goa",
    choice3: "Sungai",
    choice4: "Sumur Tua",
    answer: 1,
},
{
    question: "Siapakah polisi muda yang menemukan lokasi sumur Lubang Buaya ?",
    choice1: "Raden Suprapto",
    choice2: "Ahmad Yani",
    choice3: "Tirtodarmo",
    choice4: "Sukitmani",
    answer: 4,
},
{
    question: "Peristiwa G30S/PKI terjadi pada tahun...",
    choice1: "1948",
    choice2: "1966",
    choice3: "1965",
    choice4: "1957",
    answer: 3,
},
{
    question: "Kelompok bernama apa yang menculik para jendral? ",
    choice1: "Uni Soviet",
    choice2: "P.K.I",
    choice3: "Komusme",
    choice4: "Cakrabirawa",
    answer: 4,
},
{
    question: "Siapakah nama jenderal yang selamat dari penculikan",
    choice1: "Jenderal AH Nasution",
    choice2: "Letnan Jenderal Ahmad Yani",
    choice3: "Jenderal Moh. Hatta",
    choice4: "Jenderal Mayjen R Soeprapto",
    answer: 1,
},
{
    question: "Kapan P.K.I didirikan dan dibubarkan?",
    choice1: "1918-1965",
    choice2: "1930-1991",
    choice3: "1900-1966",
    choice4: "1914-1965",
    answer: 4,
},
]

const SCORE_POINTS = 7
const MAX_QUESTIONS = 15

startQuiz = () => {
questionCounter = 0
score = 0
availableQuestions = [...questions]
getNewQuestion()
}

getNewQuestion = () => {
if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign ('end.html')
}

questionCounter++
progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

const questionsIndex = Math.floor (Math.random() * availableQuestions.length)
currentQuestion = availableQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice =>{
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

availableQuestions.splice (questionsIndex, 1)

acceptingAnswers = true
}

choices.forEach (choice =>{
    choice.addEventListener('click', e =>{
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
        incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout (() =>{
    selectedChoice.parentElement.classList.remove(classToApply)
    getNewQuestion()
    }, 1000)
    })
})

incrementScore = num => {
    score+= num
    scoreText.innerText = score
}

startQuiz()