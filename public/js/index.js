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
        image: "../public/img/speakers/thuthao.jpg"
    },
        {
        name: "Dương Thị Thu Thảo",
        title: "Speaker TEDx AkoDhong Youth 2025",
        image: "../public/img/speakers/thuthao.jpg"
    },
        {
        name: "Dương Thị Thu Thảo",
        title: "Speaker TEDx AkoDhong Youth 2025",
        image: "../public/img/speakers/thuthao.jpg"
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
    margin: 20,
    dots: true,
    nav: false,

    autoplay: true,
    autoplayTimeout: 3000,

    responsive: {
        0: {
            items: 1
        },
        576: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 5
        }
    }
});