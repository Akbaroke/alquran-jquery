function home(){
    $.getJSON('https://api.quran.sutanlab.id/surah', function(ambil){
        let list_surat = ambil.data;
        $.each(list_surat, function(i, ambil){
            $('#daftar-surat').append(`
            <div class="card" data-id="`+ ambil.number +`">
                <p id="number">`+ambil.number+`</p>
                <div class="nama_surat">
                    <p>`+ ambil.name.transliteration.id +`</p>
                    <span>`+ ambil.name.translation.id +`</span>
                </div>
            </div>`);
        });
    });
};

$('#daftar-surat').on('click', '.card' , function(){
    let id = $(this).data('id');
    $('body').html(`
    <nav>
    <ul>
        <li><div onclick="refresh()" class="logo">AlQuran Online</div></li>
        <li>
            <div onclick="back()" class="kembali">Kembali <i class="fa-solid fa-right-from-bracket"></i></div>
        </li>
    </ul>
    </nav>
    <main class="container">
        <div class="name_head">
            <h1></h1>
            <span id="art-1"></span>
            <span id="art-2"></span>
        </div>
        <div class="list" id="daftar-ayat"></div>
    </main>
    <button class="scroll-to-top"><i class="fa-solid fa-angles-up"></i></button>
    <script
    src="https://code.jquery.com/jquery-3.6.0.js"
    integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
    crossorigin="anonymous"></script>
    <script src="js/script.js"></script>
    `);
    $.getJSON('https://api.quran.sutanlab.id/surah/'+ id +'', function(ambil){
        let ayat = ambil.data.verses;
        let countAyat = ambil.data.numberOfVerses+' ayat';
        $('h1').html(ambil.data.name.transliteration.id);
        $('#art-1').html(ambil.data.name.translation.id);
        $('#art-2').html(countAyat);
        $.each(ayat, function(i, ambil){
            $('#daftar-ayat').append(`
            <div class="ayat">
                <div>
                    <div>Juz ke-`+ ambil.meta.juz +`</div>
                    <div>`+ ambil.number.inSurah +`</div>
                </div>
                <div class="kanan">
                    <span>`+ ambil.text.arab +`</span>
                    <span>`+ ambil.text.transliteration.en +`</span>
                </div>
                <div class="kiri">
                    <span>`+ ambil.number.inSurah +`</span>
                    <span>`+ ambil.translation.id +`</span>
                </div>
                <div class="bawah">
                    <audio controls preload="metadata" src="`+ ambil.audio.primary +`"></audio>
                </div>
            </div>`);
        });
    });
    scrol();
});
function refresh(){
    location.reload();
};
function back(){
    $('body').html(`
    <nav>
        <ul>
            <li><a href="" class="logo">AlQuran Online</a></li>
            <form role="search">
                <input type="search" name="search" placeholder="Cari..." id="search">
                <i class="fa-solid fa-magnifying-glass" id="icon_search"></i>
                <i class="fa-solid fa-xmark" id="icon_search_x"></i>
                <span id="mobile"></span>
            </form>
        </ul>
    </nav>
    <main class="container">
        <div class="name_head"><h1>Daftar Surah</h1></div>
        <div class="list-surat" id="daftar-surat"></div>
    </main>
    <button class="scroll-to-top"><i class="fa-solid fa-angles-up"></i></button>
    <script
    src="https://code.jquery.com/jquery-3.6.0.js"
    integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
    crossorigin="anonymous"></script>
    <script src="js/script.js"></script>
    `);
}

$( document ).ready(function() {
    home();
    scrol();
});

$(document).ready(function(){
    $('#search').keyup(function(){
        $('#daftar-surat').html('');
        var searchField = $('#search').val().toLowerCase();
        var expression = new RegExp(searchField, "i");
        $.getJSON('https://api.quran.sutanlab.id/surah', function(ambil){
            let list_surat = ambil.data;
            $.each(list_surat, function(key, value){
                if(value.name.transliteration.id.search(expression) != -1 || value.name.translation.id.search(expression) != -1){
                    $('#daftar-surat').append(`
                    <div class="card" data-id="`+ value.number +`">
                        <p id="number">`+value.number+`</p>
                        <div class="nama_surat">
                            <p>`+ value.name.transliteration.id +`</p>
                            <span>`+ value.name.translation.id +`</span>
                        </div>
                    </div>
                    `);
                }
            });
        });
    });
});


var isActive = false;
$('#mobile').on('click',function(){
    if(isActive){
        $('nav').removeClass('mobile');
        $('#icon_search').css("display", "block");
        $('#icon_search_x').css("display", "none");
        location.reload();
        $("#search").val('');
    }else{
        $('nav').addClass('mobile');
        $('#icon_search').css("display", "none");
        $('#icon_search_x').css("display", "block");
    }
    isActive = !isActive;
});


// Scroll to top button
function scrol(){
    const scrollBtn = document.querySelector(".scroll-to-top");
    scrollBtn.addEventListener('click',() =>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })

    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    }

    $(".scroll-to-top").hover(
        function () {
            $(".Back-to-Top").css("display", "block");
        }, 
        function () {
            $(".Back-to-Top").css("display", "none");
        }
    );
};