

function fetchJSONFile(path, callback) {
var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);   
            }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}
fetchJSONFile('https://convenia-front-end-test.firebaseio.com/partners.json', function(data){
    for (var i = 0; i < data.length; i++) {
        document.getElementById('content').innerHTML += "<img src='" + data[i].image + "' title='" + data[i].name + "' />";
    }
    return slick();
});

function slick() {
    $('.content').slick({
        arrows:true,
        mobileFirst: true,
        infinite: true,
        slidesToScroll: 2,
        nextArrow: '<button class="right"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        prevArrow: '<button class="left"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        responsive: [
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5
                }
            }
        ]
      });
}

function Envia() {

    var request = new XMLHttpRequest();

    var senha = document.getElementById('senha');
    var email = document.getElementById('email');

    var senhaF = senha.value;
    var emailF = email.value;
    request.open('POST', 'https://convenia-front-end-test.firebaseio.com/users.json');

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('OK');
        }
    };

    var body = {
        'email': emailF,
        'senha': senhaF
    };

    request.send(JSON.stringify(body));
}

function validaCPF(){
    $("#nameCPF").keyup(function () {
        var cpf = $(this).val();
        if (cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999"){
            $("form>input:first-child").attr("style", "border : 1px solid red");
            $("form>div").attr("style", "opacity : 0");
            }else{
            var valor = $(this).val().length;
            if (valor === 11) {
                $("form>div").attr("style", "opacity : 1");
                $("form>input:first-child").attr("style", "border :none");
            }
        }
    });
    
}




