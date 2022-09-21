const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const header_singer = $('header p')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playlist = $('.playlist')

const playBtn = $('.btn-toggle-play')

const progress = $('#progress')

const volumeBtn = $('.volume-btn')
const volume_change = $('#controls_lever_range')

const nextBtn = $('.btn-next')
const preBtn = $('.btn-prev')

const randomBtn = $('.btn-random')

const repeatBtn = $('.btn-repeat')

const app = {
    currentIndex: 0, // lấy ra bài hát đầu tiên trong mảng
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Beautiful in White',
            singer: 'Shayne Ward',
            path: './assets/music/BeautifulInWhite-ShayneWard_kn54.mp3',
            image: './assets/img/song1.png'
        },
        {
            name: 'Breathless',
            singer: 'Shayne Ward',
            path: './assets/music/Breathless - Shayne Ward.mp3',
            image: './assets/img/song2.png'
        },
        {
            name: 'No Promises',
            singer: 'Shayne Ward',
            path: './assets/music/No Promises - Shayne Ward.mp3',
            image: './assets/img/song3.png'
        },
        {
            name: 'Until You',
            singer: 'Shayne Ward',
            path: './assets/music/Until You - Shayne Ward.mp3',
            image: './assets/img/song7.png'
        },
        {
            name: 'Đài Hoa Cúc',
            singer: 'Jay Chou',
            path: './assets/music/Dai Hoa Cuc - Jay Chou.mp3',
            image: './assets/img/song4.png'
        },
        {
            name: 'Hương Lúa',
            singer: 'Jay Chou',
            path: './assets/music/HuongLua-ChauKietLuan_32rfj.mp3',
            image: './assets/img/song5.png'
        },
        {
            name: 'Sứ Thanh Hoa',
            singer: 'Jay Chou',
            path: './assets/music/SuThanhHoa-JayChou_5nhf.mp3',
            image: './assets/img/song6.png'
        }
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    // Render ra HTML
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
        <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
          <div class="thumb" style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
        `
        })
        playlist.innerHTML = htmls.join('')
    },

    // Định nghĩa các thuộc tính
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    // Xử lý các sự kiện
    handleEvents: function () {
        const _this = this

        const cdWidth = cd.offsetWidth


        // Xử lý CD quay/ dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10 giây
            iterations: Infinity // Quay vô hạn
        })

        cdThumbAnimate.pause()

        // Cuộn - Scroll top - phóng to/thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lý khi click Play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Xử lý bài hát được play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing') // Nhạc chạy
            cdThumbAnimate.play() // Thumb xoay
        }

        // Xử lý  bài hát bị pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing') // Nhạc dừng
            cdThumbAnimate.pause() // Thumb dừng
        }

        // xử lý âm thanh bài hát 
        volume_change.oninput = function (e) {
            audio.volume = e.target.value / 100;
        }

        // Xử lý tiến độ bài hát thay đổi 
        audio.ontimeupdate = function () {
            const time_start = $('.controls_time--left');
            const time_count = $('.controls_time--right');

            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
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
                var dd = ee % 60; //số giây
                var bb = Math.floor(ee / 60); //số phút
                if (dd < 10) {
                    var cc = 0; // số chục giây
                } else {
                    cc = "";
                }

                time_count.textContent = '0' + bb + ":" + cc + dd;
            }
        }

        // Xử lý khi tua bài hát 
        progress.oninput = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // Khi next sang bài tiếp theo
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Khi chuyển về bài trước đó
        preBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.preSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Xử lý bật/tắt Random bài hát
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        // Mute & UnMute
        volumeBtn.addEventListener("click", function () {
            if (audio.muted) {
                audio.muted = false;
                volumeBtn.classList.remove('active', audio.muted)
                volume_change.classList.remove('active', audio.muted)
            } else {
                audio.muted = true;
                volumeBtn.classList.add('active', !audio.muted)
                volume_change.classList.add('active', audio.muted)
            }
        }, false);


        // Xử lý sang bài khác khi chạy xong
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // Xử lý lặp lại bài hát
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Lắng nghe hành vi click vào bài hát
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                // Xử lý click vào bài hát
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                // Xử lý khi click vào option của bài hát
                if (e.target.closest('.option')) {

                }

            }
        }
    },

    //Tải bài hát đang chạy
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        header_singer.textContent = this.currentSong.singer
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    // Chuyển sang bài tiếp theo
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0 // Về bài đầu tiên trong mảng
        }
        this.loadCurrentSong()
    },

    // Chuyển về bài trước đó
    preSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1 // Về bài cuối trong mảng
        }
        this.loadCurrentSong()
    },

    // Random bài hát
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex) //Random không lặp lại bài vừa chạy
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }, 300)
    },

    start: function () {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig()
        // Định nghĩa các thuộc tính cho object
        this.defineProperties()
        // Lắng nghe/xử lý các sự kiện (DOM events)
        this.handleEvents()

        // Tải thông tin bài hát đầu tiên khi chạy ứng dụng
        this.loadCurrentSong()
        // Render Playlist ra HTML
        this.render()

        // Hiển thị trạng thái ban đầu của button Repeat và Random
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)

    }
}

app.start()