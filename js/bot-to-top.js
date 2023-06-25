var botToTop = document.getElementById('botToTop');

window.onscroll = function () {
    // document.documentElement.scrollTop là vị trí mình scroll chuột
    if (document.documentElement.scrollTop >= 300) {
        botToTop.style.display = "block";
    } else {
        botToTop.style.display = "none";
    }
};

function handleBotToTop()
{
    window.scrollTo({top: 0, behavior: 'smooth'});
}