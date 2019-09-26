//get API
const client = contentful.createClient({
    space: "np5xiu7p1a25",
    accessToken: "rZ3ZfI6DzVOoGzafNQ5Tw3Z4iFNvP0Z1AMP-0_HPaZ8"
});


const imgToggleBtn = document.querySelector(".img-toggle-btn");
const imgSideBar = document.querySelector(".image-sidebar");
const imageSidebarSon = document.querySelector(".image-sidebar-son");

class ImageData {
    async getDatas() {
        let contentful = await client.getEntries({
            content_type: "imageProducts"
        })

        let data = contentful.items;

        data = data.map(item => {
            let {
                images,
                type
            } = item.fields;

            images = images.map(p => {
                let {
                    title,
                    file
                } = p.fields;
                file = "https:" + file.url;

                return {
                    title,
                    file
                }
            })

            return {
                images,
                type
            }
        })
        Storage.saveImages(data);
        console.log(data)
    }


}

class ImageUI {
    //side bar toggle 
    imgToggleBtn() {
        imgToggleBtn.addEventListener("click", event => {
            if (imgSideBar.classList.contains('active-image-right')) {
                imgSideBar.setAttribute('state', "close");
                imgSideBar.setAttribute('type', null);
            }
            if (imgSideBar.classList.contains('active-right')) {
                imgSideBar.classList.remove('active-right');
            } else if (imgSideBar.classList.contains('active-image-right')) {
                imgSideBar.classList.remove('active-image-right');
                imageSidebarSon.classList.remove("active-right-son");
            } else {
                imgSideBar.classList.add('active-right');
            }
        })
    }

    showImageTypeList(data) {
        let ul = document.createElement("ul");
        data.forEach(element => {
            let li = document.createElement("li");
            li.classList.add("type-image-button");
            li.innerHTML = `
               ${element.type}
            `;
            ul.appendChild(li);
        });

        imgSideBar.appendChild(ul);
    }

    imageTypeListButtonToggle() {
        const imgButtonList = [...document.querySelectorAll(".type-image-button")];
        imgButtonList.forEach(p => {
            p.addEventListener("click", event => {
                this.showImageList(p.innerText);
                this.changeSider(p.innerText);
                this.imageToggle();
            })
        })

    }

    setBackground(icon) {
        console.log(icon)
        document.body.style.backgroundImage = "url(./images-music/" + icon + ")";
    }

    imageToggle() {
        const imageBtnList = [...document.querySelectorAll(".image-button")];

        imageBtnList.forEach(p => {
            p.addEventListener("click", event => {
                let title = p.getElementsByTagName("img")[0].alt;
                this.setBackground(title);
            })
        })
    }

    changeSider(type) {
        let check = imgSideBar.getAttribute("type");
        console.log(check)
        let state = imgSideBar.getAttribute("state")
        if (check === null || check === type || check === "null") {
            imgSideBar.setAttribute('type', type);
            imageSidebarSon.classList.toggle("active-right-son");


            if (state == "open") {
                imgSideBar.setAttribute('state', "close");
                imgSideBar.setAttribute('type', null);
            } else imgSideBar.setAttribute('state', "open");


            if (imgSideBar.classList.contains("active-image-right")) {
                imgSideBar.classList.remove("active-image-right");
                imgSideBar.classList.add("active-right");
            } else {
                imgSideBar.classList.add("active-image-right");
                imgSideBar.classList.remove("active-right");
            }

        } else {
            imgSideBar.setAttribute('type', type);
            this.showImageList(type);
        }



    }


    showImageList(type) {

        const data = Storage.getAllData();

        let images = data.filter(p => {
            return p.type === type
        })

        images = images[0].images;
        let ul = "";

        images.forEach(p => {
            ul += `
            <li class="image-button">   
            <img src="${p.file}" alt="${p.title}" width="300px" height="180px">
            </li>
            `;
        })

        imageSidebarSon.innerHTML = `
         <ul></ul>
        `;

        imageSidebarSon.getElementsByTagName("ul")[0].innerHTML = ul;
    }
}

class Storage {
    static saveImages(data) {
        localStorage.setItem("images", JSON.stringify(data));
    }

    static getAllData() {
        const data = JSON.parse(localStorage.getItem("images"));
        return data;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const imgUI = new ImageUI();
    const imageData = new ImageData();

    imgUI.imgToggleBtn();
    imageData.getDatas().then(() => {
        imgUI.showImageTypeList(Storage.getAllData());
    }).then(() => {
        imgUI.imageTypeListButtonToggle();
    }).then(() => {
        imgUI.imageToggle();
    })

})