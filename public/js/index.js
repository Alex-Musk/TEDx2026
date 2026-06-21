const speakers = [
    {
        name: "Nguyễn Thị Kim Chi",
        title: "Speaker TEDx AkoDhong Youth 2024",
        image: "../public/img/speakers/kimchi.jpg"
    },
    {
        name: "Trần Tiến Lợi",
        title: "Speaker TEDx AkoDhong Youth 2024",
        image: "../public/img/speakers/tienloi.jpg"
    },
    {
        name: "Bùi Ngọc Đức Thiện",
        title: "Speaker TEDx AkoDhong Youth 2025",
        image: "../public/img/speakers/thien.jpg"
    },
    {
        name: "Dương Thị Thu Thảo",
        title: "Speaker TEDx AkoDhong Youth 2025",
        image: "../public/img/speakers/thuthao.jpeg"
    },
        {
        name: "Dương Thị Thu Thảo",
        title: "Speaker TEDx AkoDhong Youth 2025",
        image: "../public/img/speakers/thuthao.jpeg"
    },
        {
        name: "Dương Thị Thu Thảo",
        title: "Speaker TEDx AkoDhong Youth 2025",
        image: "../public/img/speakers/thuthao.jpeg"
    }
];

const carousel = document.getElementById("speakerList");

speakers.forEach(speaker => {
    carousel.innerHTML += `
        <div class="item">
            <div class="speaker-card">
                <img src="${speaker.image}"
                     class="speaker-img"
                     alt="${speaker.name}">

                <div class="speaker-info">
                    <h5>${speaker.name}</h5>
                    <p>${speaker.title}</p>
                </div>
            </div>
        </div>
    `;
});

$('.speaker-carousel').owlCarousel({
    loop: true,
    center: true,
    items: 5,
    margin: 20,
    dots: true,
    nav: false,

    autoplay: true,
    autoplayTimeout: 3000,

    responsive:{
        0:{ items:5 }
    }
});