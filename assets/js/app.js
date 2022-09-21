const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist')
const cdContainer = $('.cd-container')
const cd = $('.cd')
const heading = $('header h2')
const thumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')

const progress = $('#progress')

const volumeBtn = $('.volume-btn')
const volume_change = $('#controls_lever_range')

const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')

let newArray = []
var isMusic = 'vietnamese'
const PlAYER_STORAGE_KEY = "MUSIC_APP";
const LIST_STORAGE_KEY = "MUSIC_LIST";
const random = $('.btn-random')
const repeat = $('.btn-repeat')
let indexArray = []

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    songs: {
        vietnamese: [
            {
                name: "Bước Qua Nhau",
                singer: "Vũ",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/BuocQuaNhau-Vu-7120388.mp3?st=I9W59X1Odyi9QRGTehWfHg&e=1638708688",
                image: "https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637317177185.jpg"
            },
            {
                name: "Ái Nộ",
                singer: "Masew, Khôi Vũ",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/AiNo1-MasewKhoiVu-7078913.mp3?st=ngcoKLRyRorVu8KqUeS1wg&e=1638762705",
                image: "https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630316309035.jpg"
            },
            {
                name: "Muộn Rồi Mà Sao Còn",
                singer: "Sơn Tùng M-TP",
                path: "https://c1-ex-swe.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=tD-Ln6qGqkdH659AeuHsjQ&e=1638782546",
                image: "https://avatar-nct.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261.jpg"
            },
            {
                name: "Thức Giấc",
                singer: "Da LAB",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/ThucGiac-DaLAB-7048212.mp3?st=1LcQhTisk8WrOQuzK4p86Q&e=1638782708",
                image: "https://avatar-nct.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810.jpg"
            },
            {
                name: "Độ Tộc 2",
                singer: "Masew, Độ Mixi, Phúc Du, Pháo",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3?st=ehahZN3-iX9xYdBFgDgGcg&e=1638782785",
                image: "https://avatar-nct.nixcdn.com/song/2021/08/10/b/2/e/0/1628579601228.jpg"
            },
            {
                name: "Chúng Ta Sau Này",
                singer: "T.R.I",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/ChungTaSauNay-TRI-6929586.mp3?st=l56Wr1fLE9fMnFehhpo5xg&e=1638782875",
                image: "https://avatar-nct.nixcdn.com/song/2021/01/27/5/2/2/b/1611738358661.jpg"
            },
            {
                name: "Dịu Dàng Em Đến",
                singer: "ERIK, NinjaZ",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/DiuDangEmDen-ERIKNinjaZ-7078877.mp3?st=QmjyqbnGv3jClPKm4oA1YQ&e=1638782938",
                image: "https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630307726211.jpg"
            },
            {
                name: "Hương",
                singer: "Văn Mai Hương, Negav",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/Huong-VanMaiHuongNegav-6927340.mp3?st=PvHOWlRnF6TymvggYGding&e=1638783027",
                image: "https://avatar-nct.nixcdn.com/song/2021/01/22/9/f/2/1/1611280898757.jpg"
            },
            {
                name: "Miên Man",
                singer: "DUTZUX",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/MienMan-DUTZUX-7120884.mp3?st=yTOFq5aH8FGEvbm-_n_KTA&e=1638783090",
                image: "https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637320885751.jpg"
            },
            {
                name: "Có hẹn với thanh xuân",
                singer: "MONSTAR",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/cohenvoithanhxuan-MONSTAR-7050201.mp3?st=PjrrnZ2dZ3ffA6R7dRrppQ&e=1638783161",
                image: "https://avatar-nct.nixcdn.com/song/2021/07/16/f/4/9/8/1626425507034.jpg"
            }
        ],
        english: [
            {
                name: "Beautiful In White",
                singer: "Shayne Ward",
                path: "./assets/music/BeautifulInWhite-ShayneWard_kn54.mp3",
                image: "./assets/img/song1.png"
            },
            {
                name: "Breathless",
                singer: "Shayne Ward",
                path: "./assets/music/Breathless - Shayne Ward.mp3",
                image: "./assets/img/song2.png"
            },
            {
                name: "No Promises",
                singer: "Shayne Ward",
                path: "./assets/music/No Promises - Shayne Ward.mp3",
                image: "./assets/img/song5.png"
            },
            {
                name: "SheWillBeLoved-Maroon5",
                singer: "Justin Bieber",
                path: "./assets/music/SheWillBeLoved-Maroon5_hkbh.mp3",
                image: "./assets/img/song6.png"
            },
            {
                name: "Until You",
                singer: "The Kid LAROI, Shayne Ward",
                path: "./assets/music/Until You - Shayne Ward.mp3",
                image: "./assets/img/song7.png"
            },
            {
                name: "Stay",
                singer: "The Kid LAROI, Justin Bieber",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/Stay-TheKidLAROIJustinBieber-7045258.mp3?st=tDMLXwH5rcrkO9nF-Y0mWA&e=1638769802",
                image: "https://avatar-nct.nixcdn.com/song/2021/07/09/5/5/8/2/1625815274622.jpg"
            },
            {
                name: "All Too Well",
                singer: "Taylor Swift",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/AllTooWell10MinuteVersionTaylorsVersion-TaylorSwift-7120438.mp3?st=moySlM-gRk8kpSEQdA729g&e=1638673508",
                image: "https://avatar-nct.nixcdn.com/song/2021/11/23/d/a/a/e/1637643196932_300.jpg"
            },
            {
                name: "Equal In The Darkness",
                singer: "Steve Aoki, Thái Y Lâm (Jolin Tsai), MAX",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/EqualInTheDarkness-SteveAokiThaiYLamJolinTsaiMAX-7116228.mp3?st=1TO5aq2W9pnBPnKJ-0BwLA&e=1638673651",
                image: "https://avatar-nct.nixcdn.com/song/2021/10/27/0/c/c/3/1635299658476_300.jpg"
            },
            {
                name: "Always Love You",
                singer: "Elton John, Young Thug, Nicki Minaj",
                path: "https://c1-ex-swe.nixcdn.com/Unv_Audio203/AlwaysLoveYou-EltonJohnYoungThugNickiMinaj-7114807.mp3?st=FjWol1PzZ4cmEPzH-8rKdQ&e=1638673737",
                image: "https://avatar-nct.nixcdn.com/song/2021/10/21/c/d/d/a/1634797395961.jpg"
            },
            {
                name: "Wildest Dreams (Taylor's Version)",
                singer: "Taylor Swift",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1022/WildestDreamsTaylorsVersion-TaylorSwift-7090980.mp3?st=MqTkbQYsSI-Wri68OiCggA&e=1638673817",
                image: "https://avatar-nct.nixcdn.com/song/2021/09/17/5/a/b/4/1631889063619_300.jpg"
            },
            {
                name: "Lonely",
                singer: "Justin Bieber, Benny Blanco",
                path: "https://c1-ex-swe.nixcdn.com/Unv_Audio197/Lonely-JustinBieberbennyblanco-6993497.mp3?st=HfdveKXgMQiQEl5_nrafHg&e=1638784621",
                image: "https://avatar-nct.nixcdn.com/song/2020/10/16/7/4/6/2/1602823109092.jpg"
            },
            {
                name: "Intentions",
                singer: "Justin Bieber, Quavo",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui995/Intentions-JustinBieberQuavo-6217997.mp3?st=hcdpQpM3beevQ-_6KJ82dA&e=1638784782",
                image: "https://avatar-nct.nixcdn.com/song/2020/02/07/2/0/7/2/1581052824234.jpg"
            },
            {
                name: "Hold On",
                singer: "Justin Bieber, Dominic Fike",
                path: "https://c1-ex-swe.nixcdn.com/Unv_Audio201/HoldOn-JustinBieber-7103059.mp3?st=Jb7CePADDk5Lz9NMD9pSAQ&e=1638784678",
                image: "https://avatar-nct.nixcdn.com/song/2021/03/05/2/1/7/c/1614931554567.jpg"
            },
            {
                name: "Monster",
                singer: "Shawn Mendes, Justin Bieber",
                path: "https://c1-ex-swe.nixcdn.com/Unv_Audio188/Monster-ShawnMendesJustinBieber-6838261.mp3?st=w65iy6S0b1mtDlUnsZOceA&e=1638784732",
                image: "https://avatar-nct.nixcdn.com/song/2020/11/23/0/2/3/c/1606100084558.jpg"
            },
            {
                name: "All Around Me",
                singer: "Justin Bieber",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui995/AllAroundMe-JustinBieber-6223828.mp3?st=vvGCbil4vC_5l_05XNgOtw&e=1638873647",
                image: "https://avatar-nct.nixcdn.com/song/2020/02/14/a/9/d/b/1581658518670.jpg"
            }
        ],
        korea: [
            {
                name: "Haru Haru",
                singer: "BIGBANG",
                path: "https://c1-ex-swe.nixcdn.com/YG_Audio1/HaruHaru-BIGBANG-6291516.mp3?st=Gspt0qSx7rVZoYeM-x2jXA&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2020/06/09/2/d/0/7/1591688793624.jpg"
            },
            {
                name: "Loser",
                singer: "BIGBANG",
                path: "https://c1-ex-swe.nixcdn.com/YG_Audio1/Loser-BIGBANG-6291940.mp3?st=Lhof5KoX62zevt2ZEXBP-A&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734574215.jpg"
            },
            {
                name: "Let'S Not Fall In Love",
                singer: "BIGBANG",
                path: "https://c1-ex-swe.nixcdn.com/YG_Audio1/LetSNotFallInLove-BIGBANG-6292282.mp3?st=fcFmzvoy9t6mhv487BnahA&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734613690.jpg"
            },
            {
                name: "Blue",
                singer: "BIGBANG",
                path: "https://c1-ex-swe.nixcdn.com/YG_Audio1/Blue-BIGBANG-6292792.mp3?st=g0jDh_aS0bi75C3ZD9FhvA&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2019/08/08/1/e/0/1/1565247252132.jpg"
            },
            {
                name: "Bang Bang Bang",
                singer: "BIGBANG",
                path: "https://c1-ex-swe.nixcdn.com/YG_Audio1/BangBangBang-BIGBANG-6293092.mp3?st=6I573fkPVGoqOxI43cIGVw&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734586323.jpg"
            },
            {
                name: "If You",
                singer: "BIGBANG",
                path: "https://c1-ex-swe.nixcdn.com/YG_Audio1/IfYou-BIGBANG-6292294.mp3?st=xp-NrUXRQJTWzQabivltww&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734599196.jpg"
            },
            {
                name: "Horang Suwolga",
                singer: "Sangnoksu, Narae",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1005/HorangSuwolga-SangnoksuNarae-6770371.mp3?st=Ks8apkixAmM2J_Yr8k0-eA&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2020/12/14/5/c/b/a/1607915686599.jpg"
            },
            {
                name: "Celebrity",
                singer: "IU",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1011/Celebrity-IU-6938138.mp3?st=iM5VWwaQtj1ImVGkz3bq8Q&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2021/03/01/7/7/d/0/1614570355625.jpg"
            },
            {
                name: "Blueming",
                singer: "IU",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui992/Blueming-IU-6138404.mp3?st=HGiSqSggzq_yx7A8dWC5aQ&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2019/11/18/b/0/e/0/1574073260102.jpg"
            },
            {
                name: "Love Scenario",
                singer: "iKON",
                path: "https://c1-ex-swe.nixcdn.com/YG_Audio1/LoveScenario-iKON-6292220.mp3?st=GquH-Wmqa8cjZfNqRgIM7w&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2018/01/25/5/2/d/e/1516873006451.jpg"
            },

        ],
        china: [
            {
                name: "Mạc Ly / 莫离 (Gia Nam Truyện OST)",
                singer: "Cúc Tịnh Y (Ju Jing Yi)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/MacLyGiaNamTruyenOST-CucTinhYJuJingYi-7114103.mp3?st=1kYhMVrtp1prZDQLxMbXzQ&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/song/2021/10/26/8/1/f/e/1635241730249.jpg"
            },
            {
                name: "Tay Trái Chỉ Trăng / 左手指月",
                singer: "Tát Đỉnh Đỉnh (Sa Ding Ding)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui962/TayTraiChiTrang-TatDinhDinhSaDingDing-5431513.mp3?st=R7nm-Q6FxpUL0UxCDMq2ig&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/song/2019/05/02/d/4/7/3/1556786602391.jpg"
            },
            {
                name: "Sứ Thanh Hoa / 青花瓷",
                singer: "Châu Kiệt Luân (Jay Chou)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui964/SuThanhHoa-ChauKietLuanJayChou-108110.mp3?st=ieBMFvjQWp7apqOrblPsiQ&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/song/2019/08/07/3/6/d/a/1565165369019.jpg"
            },
            {
                name: "Phi Điểu Và Ve Sầu / 飞鸟和蝉",
                singer: "Nhậm Nhiên",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1000/ChimBayCungVe-NhamNhien-6321767.mp3?st=OPJVhLrpz3u1cVbknHRjzw&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/song/2020/07/03/8/9/c/9/1593752079734.jpg"
            },
            {
                name: "Mang Chủng / 芒种",
                singer: "Âm Khuyết Thi Thính, Triệu Phương Tịnh (Zhao Fangjing)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui983/MangChung-TrieuPhuongTinhAmKhuyetThiThinh-5989054.mp3?st=9WINGtCn0ciu3GtGJODdrQ&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/song/2019/08/05/1/9/9/6/1565016156395.jpg"
            },
            {
                name: "Đồng Thoại",
                singer: "Quang Lương (Michael Wong)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui946/DongThoai-MichaelWongQuangLuong-161624.mp3?st=lVaJblR1dnRj2csOFwvkRA&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/song/2019/08/07/3/6/d/a/1565163727207.jpg"
            },
            {
                name: "Vô Ngu / 无虞 (Châu Sinh Như Cố Ost)",
                singer: "Lý Tử Đình (Mimi Lee), Tỉnh Lung (Jing Long)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/VoNguChauSinhNhuCoOst-LyTuDinhMimiLeeTinhLungJingLong-7075326.mp3?st=H_9Pz6muAHchS9Pn6n3-qA&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/song/2021/08/26/6/5/8/f/1629966116215.jpg"
            },
            {
                name: "Ái Thương",
                singer: "Đổng Trinh (Dong Zhen)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui155/AiThuong-DongTrinh_35bzb.mp3?st=xwSnK7z8klRBvJR4sKuo3Q&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/singer/avatar/2017/03/22/7/e/b/2/1490170353513.jpg"
            },
            {
                name: "Bất Nhiễm / 不染 (Hương Mật Tựa Khói Sương OST)",
                singer: "Mao Bất Dịch (Mao Bu Yi)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui960/BatNhiem-MaoBatDichMaoBuyi-5393965.mp3?st=-66MXvOtm335TBJ4NHba5Q&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/song/2019/05/02/d/4/7/3/1556786553828.jpg"
            },
            {
                name: "Thiếu Niên / 少年",
                singer: "Mộng Nhiên (Meng Ran)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui996/ThieuNien-MongNhienMengRan-6238337.mp3?st=izeVhk_T_SP2bFJHAjencQ&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/song/2020/03/18/3/d/4/9/1584522109605.jpg"
            },
        ],
        love: [
        ],
    },
    // defineProperties: function() {
    //     Object.defineProperty(this, 'currentSong', {
    //         get: function() {
    //             return this.songs[currentMusic][this.currentIndex]
    //         }
    //     })
    // },
    handleEvents: function (isMusic) {
        // Xử lý khi scroll 
        const cdWidth = cd.offsetWidth;
        const _this = this
        document.onscroll = function () {
            if ($('.download.active') || false) {
                $('.download.active').classList.remove('active')
            }
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            thumb.style.border = newCdWidth > 0 ? `1px solid var(--primary-color)` : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Play songs
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
                _this.config[isMusic] > 2 ? $(".song.active").scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                }) : _this.scrollToActiveSong(isMusic)
            }
        }

        // Animation thumb
        const animateThumb = cd.animate([
            {
                transform: "rotate(360deg)"
            }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        animateThumb.pause()
        this.hendleAbumMusic(animateThumb)
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add("playing")
            cdContainer.classList.add('active')
            $('.song.active .spectrum').classList.remove('paused')
            $('.song.active .spectrum').classList.add('active')
            animateThumb.play()
        }

        // Xử lý  bài hát bị pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove("playing")
            cdContainer.classList.remove('active')
            $('.song.active .spectrum').classList.remove('active')
            $('.song.active .spectrum').classList.add('paused')
            animateThumb.pause()
        }

        // Xử lý âm thanh bài hát 
        volume_change.oninput = function (e) {
            audio.volume = e.target.value / 100;
        }

        // Tiến độ bài hát
        audio.ontimeupdate = function () {
            const time_start = $('.controls_time--left');
            const time_count = $('.controls_time--right');
            if (audio.duration) {
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
                progress.value = progressPercent
                // Xử lý tính thời gian của bài hát
                // Time Start
                var e = Math.floor(audio.currentTime); // thời gian hiện tại bài hát đang chạy
                var d = e % 60; // số giây
                var b = Math.floor(e / 60); // số phút
                if (d < 10) {
                    var c = 0; // số chục giây
                } else {
                    c = "";
                }
                time_start.textContent = '0' + b + ":" + c + d;
                // Time Count
                var ee = Math.floor(audio.duration); // Tổng số thời gian bài hát
                var dd = ee % 60; // số giây
                var bb = Math.floor(ee / 60); // số phút
                if (dd < 10) {
                    var cc = 0; // số chục giây
                } else {
                    cc = "";
                }

                time_count.textContent = '0' + bb + ":" + cc + dd;
            }
        }


        // Tua bài hát
        progress.oninput = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            // progress.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color)  ${this.value}%, #d3d3d3   ${this.value}%, #d3d3d3 100%)`
            audio.currentTime = seekTime
            audio.pause()
        }

        progress.onchange = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime
            audio.play()
        }

        // Next một bài hát
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong(isMusic)
            }
            _this.nextSong(isMusic)
            _this.renderSongs(isMusic)
            _this.scrollToActiveSong()
            audio.play()
        }

        // Prev một bài hát
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong(isMusic)
            }
            _this.prevSong(isMusic)
            _this.renderSongs(isMusic)
            _this.scrollToActiveSong()
            audio.play()
        }

        // Khi kết thúc một bài hát
        audio.onended = function () {
            if (_this.isRandom) {
                _this.randomSong(isMusic)
                audio.play()
            }
            else if (_this.isRepeat) {
                audio.play()
            }
            else {
                nextBtn.onclick()
            }
        }

        // Random bài hát
        random.onclick = function () {
            if (_this.isRepeat) {
                _this.isRepeat = !_this.isRepeat
                repeat.classList.toggle('active', _this.isRepeat)
                _this.setConfig('isRepeat', _this.isRepeat)
            }
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            random.classList.toggle('active', _this.isRandom)
        }

        // Xử lý lặp lại bài hát
        repeat.onclick = function () {
            if (_this.isRandom) {
                _this.isRandom = !_this.isRandom
                random.classList.toggle('active', _this.isRandom)
                _this.setConfig('isRandom', _this.isRandom)
            }
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeat.classList.toggle('active', _this.isRepeat)
        }

        // Mute & UnMute
        volumeBtn.addEventListener("click", function () {
            if (audio.muted) {
                audio.muted = false;
                volumeBtn.classList.remove('active', audio.muted)
                volume_change.classList.remove('active', audio.muted)
                $('.volume-btn .fa-volume-mute').classList.add('active');
            } else {
                audio.muted = true;
                volumeBtn.classList.add('active', !audio.muted)
                volume_change.classList.add('active', audio.muted)
                $('.volume-btn .fa-volume-mute').classList.remove('active');
            }
        }, false);

        // Chọn bài hát 
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");
            if (songNode && !e.target.closest('.option')) {
                isMusic == undefined ? isMusic = 'vietnamese' : ''
                _this.currentIndex = Number(songNode.dataset.index)
                _this.setConfig(isMusic, _this.currentIndex)
                _this.loadCurrentSong(isMusic)
                _this.renderSongs(isMusic)
                audio.play()
            }
            if (e.target.closest('.option')) {
                var name = e.target.closest('.option').dataset.name
                var singer = e.target.closest('.option').dataset.singer
                var index = e.target.closest('.option').dataset.index
                var image = e.target.closest('.option').dataset.image
                var path = e.target.closest('.option').dataset.path
                const getLocalSongs = _this.songs.love.filter(function (value) {
                    return value.name == name
                })
                if (getLocalSongs.length >= 1) {
                    $('.like').innerText = 'Xóa bài hát khỏi danh sách yêu thích'
                    $('.like').classList.add('active')
                    $('.like').setAttribute('value', 'unlike')
                } else {
                    $('.like').innerText = 'Thêm bài hát vào danh sách yêu thích'
                    $('.like').setAttribute('value', 'like')
                    $('.like').classList.remove('active')
                }
                $('.blockOptions').classList.add('active')
                $('.modal').classList.add('active')
                $('.download a').setAttribute('href', path)
                var opt = { 'data-name': name, 'data-singer': singer, 'data-index': index, 'data-image': image, 'data-path': path };
                Object.keys(opt).forEach(function (key) {
                    $('.like').setAttribute(key, opt[key])
                })
                _this.hendleLikeSongs(opt, isMusic, animateThumb)
            }
        }
        $('.modal').onclick = function (e) {
            e.target.classList.remove('active')
            $('.blockOptions').classList.remove('active')
        }
    },

    hendleAbumMusic: function (animateThumb) {
        const that = this
        $$('.locationMusic div').forEach(function (value) {
            value.onclick = function (e) {
                const valueIsMusic = e.target.getAttribute('value')
                that.checkCurrentIndex(isMusic)
                if (!e.target.closest('.locationMusic > .select')) {
                    if (e.target.innerText == 'LOVE' && that.songs.love.length === 0) {
                        alert('Bạn chưa có bài hát yêu thích!!')
                    } else {
                        switch (valueIsMusic) {
                            case 'vietnamese':
                                isMusic = 'vietnamese'
                                break;
                            case 'english':
                                isMusic = 'english'
                                break;
                            case 'korea':
                                isMusic = 'korea'
                                break;
                            case 'china':
                                isMusic = 'china'
                                break;
                            case 'love':
                                isMusic = 'love'
                                break;
                        }
                        that.config[isMusic] == undefined ? that.setConfig(isMusic, 0) : ''
                        that.config[isMusic] ? that.currentIndex = that.config[isMusic] : that.currentIndex = 0
                        indexArray = []
                        progress.value = 0
                        animateThumb.pause()
                        that.isPlaying = false;
                        player.classList.remove('playing')
                        cd.style.width = 150 + 'px'
                        cd.style.opacity = null;
                        that.renderSongs(isMusic)
                        that.handleEvents(isMusic)
                        that.loadCurrentSong(isMusic)
                        that.nextSong(isMusic)
                        that.prevSong(isMusic)
                        $('.locationMusic > .select').classList.remove('select')
                        e.target.classList.add('select')
                        // $('.song.active') ? that.scrollToActiveSong() : ''
                        that.config[isMusic] > 2 ? $(".song.active").scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        }) : that.scrollToActiveSong()
                    }
                }
            }
        })
    },
    checkCurrentIndex: function (isMusic) {
        if (this.config[isMusic] == null) {
            this.config[isMusic] = 0
        }
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "end",
            })
        }, 300);
    },
    loadCurrentSong: function (isMusic) {
        heading.textContent =
            this.config[isMusic] ? this.songs[isMusic][this.config[isMusic]].name
                : this.songs[isMusic][this.currentIndex].name
        thumb.style.backgroundImage =
            this.config[isMusic] ? `url(${this.songs[isMusic][this.config[isMusic]].image})`
                : `url(${this.songs[isMusic][this.currentIndex].image})`
        audio.src =
            this.config[isMusic] ? this.songs[isMusic][this.config[isMusic]].path
                : this.songs[isMusic][this.currentIndex].path
    },
    renderSongs: function (music) {
        this.config['vietnamese'] == undefined ? this.setConfig('vietnamese', 0) : ''
        music == undefined ? music = 'vietnamese' : ''
        const htmls = this.songs[music].map((song, index) =>
            `
            <div class="song ${index === this.config[music] ? "active" : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option" data-index="${index}" data-path="${song.path}" data-name="${song.name}" data-singer="${song.singer}" data-image="${song.image}">
                        <i class="fas fa-ellipsis-h"></i>
                </div>
                <div class="spectrum">
                    <div></div>
                </div>
            </div>
            `
        );
        playlist.innerHTML = htmls.join('')
    },
    hendleLikeSongs: function (dataSongs, isMusic, animateThumb) {
        const name = dataSongs['data-name']
        const singer = dataSongs['data-singer']
        const path = dataSongs['data-path']
        const image = dataSongs['data-image']
        const index = dataSongs['data-index']
        const listArray = {
            name,
            singer,
            path,
            image
        }
        const _this = this
        $('.like').onclick = function (e) {
            if (e.target.getAttribute('value') == 'like') {
                if (_this.songs.love.length >= 0 && isMusic != 'english' && isMusic != 'korea' && isMusic != 'china') {
                    isMusic = 'vietnamese';
                }
                _this.songs.love.push(listArray)
                localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(_this.songs.love))
                _this.setConfig(name, name)
                _this.renderSongs(isMusic)
                $('.like').classList.add('active')
                $('.like').innerText = 'Xóa bài hát khỏi danh sách yêu thích'
                $('.modal').click()
                alert('Đã thêm vào danh sách yêu thích')
            }
            else if (e.target.getAttribute('value') == 'unlike') {
                const deleteArray = _this.songs.love.filter(function (value) {
                    return value.name != name
                })
                const storageMusic = JSON.parse(localStorage.getItem(LIST_STORAGE_KEY))
                newArray = deleteArray
                _this.songs.love = newArray
                localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(_this.songs.love))
                _this.setConfig(name, null)
                newArray = []
                _this.renderSongs(isMusic)

                if (storageMusic[_this.currentIndex].name) {
                    if (storageMusic[_this.currentIndex].name == name && _this.config[isMusic] == 0 && isMusic == 'love') {
                        _this.config[isMusic] = 0
                        player.classList.remove('playing')
                        _this.isPlaying = false
                        progress.value = 0
                        animateThumb.pause()
                        _this.songs.love.length > 0 ? _this.renderSongs(isMusic) : ''
                        _this.songs.love.length > 0 ? _this.loadCurrentSong(isMusic) : ''
                    }
                }
                if (_this.config[isMusic] > 0 && isMusic == 'love') {
                    if (storageMusic[_this.currentIndex].name != name && index > _this.config[isMusic]) {
                        _this.renderSongs(isMusic)
                    }
                    if (storageMusic[_this.currentIndex].name != name && index < _this.config[isMusic]) {
                        _this.config[isMusic] = _this.config[isMusic] - 1
                        index > _this.currentIndex ? '' : _this.setConfig(isMusic, _this.config[isMusic])
                        _this.currentIndex--
                        _this.renderSongs(isMusic)
                    }
                    if (storageMusic[_this.currentIndex].name == name && index == storageMusic.length - 1) {
                        player.classList.remove('playing')
                        _this.isPlaying = false
                        progress.value = 0
                        animateThumb.pause()
                        _this.currentIndex = --_this.config[isMusic]
                        _this.setConfig(isMusic, _this.currentIndex)
                        _this.loadCurrentSong(isMusic)
                        _this.renderSongs(isMusic)
                    }
                }
                if (_this.songs.love.length == 0) {
                    _this.currentIndex = _this.config[isMusic]
                    _this.config[isMusic] = 0
                    $('.vietnamese').click()
                }
                $('.like').classList.remove('active')
                $('.like').innerText = 'Thêm bài hát vào danh sách yêu thích'
                $('.modal').click()
            }
        }
    },
    nextSong: function (isMusic) {
        isMusic == undefined ? isMusic = 'vietnamese' : ''
        this.setConfig(isMusic, ++this.config[isMusic])
        ++this.currentIndex
        if (this.config[isMusic] >= this.songs[isMusic].length) {
            this.setConfig(isMusic, 0)
            this.currentIndex = 0
        }
        this.loadCurrentSong(isMusic)
        // this.renderSongs(isMusic)
    },
    prevSong: function (isMusic) {
        isMusic == undefined ? isMusic = 'vietnamese' : ''
        this.setConfig(isMusic, --this.config[isMusic])
        --this.currentIndex
        if (this.config[isMusic] < 0) {
            this.setConfig(isMusic, this.songs[isMusic].length - 1)
            this.currentIndex = this.songs[isMusic].length - 1
        }
        this.loadCurrentSong(isMusic)
        // this.renderSongs(isMusic)
    },
    randomSong: function (isMusic) {
        isMusic == undefined ? isMusic = 'vietnamese' : ''
        let newIndex;
        let _that = this
        if (indexArray.length === _that.songs[isMusic].length) {
            indexArray = []
        }
        do {
            newIndex = Math.floor(Math.random() * _that.songs[isMusic].length)
        }
        while (indexArray.includes(newIndex))
        indexArray.push(newIndex)
        _that.config[isMusic] = newIndex
        _that.loadCurrentSong(isMusic)
        _that.renderSongs(isMusic)
        _that.scrollToActiveSong()
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    start: function () {
        localStorage.getItem(LIST_STORAGE_KEY) && this.songs.love.length === 0 ? this.songs.love = JSON.parse(localStorage.getItem(LIST_STORAGE_KEY)) : ''
        // ham xu ly music location
        this.hendleAbumMusic()
        // Hàm xử lý events DOM
        this.handleEvents()
        // Hàm lấy ra 1 song
        // this.defineProperties();

        // Hàm render ra List Songs
        this.renderSongs(isMusic)
        // Hàm load song
        this.loadCurrentSong(isMusic)
        // load dữ liệu config trên localStorage
        this.loadConfig()
        random.classList.toggle('active', this.isRandom || false)
        repeat.classList.toggle('active', this.isRepeat || false)
    }
}

app.start()

