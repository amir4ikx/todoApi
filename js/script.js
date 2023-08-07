let doc = document
let inputName = doc.querySelector(".inputName")
let inputYear = doc.querySelector(".inputYear")
let formBtn = doc.querySelector(".formBtn")
let number = doc.querySelector(".number")
let year = doc.querySelector(".year")
let name = doc.querySelector(".name")
let deystviya = doc.querySelector(".deystviya")
let popUpWrap = doc.querySelector(".editPopUpWrap")
let popUpClose = doc.querySelector(".editPopUp-close")
let popUpInputName = doc.querySelector(".editPopUp-name")
let popUpInputYear = doc.querySelector(".editPopUp-year")
let popUpBtn = doc.querySelector(".popUpBtn")

axios.get("http://localhost:3002/values")

    .then(res => {

        formBtn.onclick = () => {
            if (inputName.value != "" && inputYear.value != "") {
                if (!isNaN(inputYear.value)) {
                    axios.post('http://localhost:3002/values', {
                        name: inputName.value,
                        year: inputYear.value
                    })
                } else {
                    alert("Введите число в поле 'Возраст' и имя в поле 'Имя")
                }
            } else {
                alert("Заполните все поля")
            }
        }

        for (let i = 0; i < res.data.length; i++) {

            let userId = doc.createElement("div")
            userId.classList.add("userId")
            userId.innerHTML = i + 1
            number.append(userId)

            let userName = doc.createElement("div")
            userName.innerHTML = res.data[i].name
            name.append(userName)

            let userYear = doc.createElement("div")
            userYear.innerHTML = 2023 - res.data[i].year
            year.append(userYear)

            let buttons = doc.createElement("div")
            buttons.style.display = "flex"
            buttons.style.justifyContent = "space-evenly"
            deystviya.append(buttons)

            let deleteButton = doc.createElement("button")
            deleteButton.innerHTML = "&#10006"
            deleteButton.style.width = "20px"
            deleteButton.classList.add("deleteButton")
            deleteButton.setAttribute("id", res.data[i].id)
            buttons.append(deleteButton)

            let editButton = doc.createElement("button")
            editButton.innerHTML = "&#9998"
            editButton.style.width = "20px"
            editButton.classList.add("editButton")
            editButton.setAttribute("id", res.data[i].id)
            buttons.append(editButton)


            editButton.onclick = (e) => {
                let editBtnId = e.target.getAttribute("id")
                popUpWrap.classList.add("editPopUpActive")

                popUpBtn.onclick = () => {
                    popUpWrap.classList.remove("editPopUpActive")

                    axios.put(`http://localhost:3002/values/${editBtnId}`, {
                        name: popUpInputName.value,
                        year: popUpInputYear.value
                    })
                }
            }

            popUpClose.onclick = () => {
                popUpWrap.classList.remove("editPopUpActive")
            }

            deleteButton.onclick = (e) => {
                let deleteBtnId = e.target.getAttribute("id")
                axios.delete(`http://localhost:3002/values/${deleteBtnId}`)
            }
        }
    })
