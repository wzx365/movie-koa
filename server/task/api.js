// api url http://api.douban.com/v2/movie/subject/1764796

const rp = require('request-promise-native')

async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url)

    return res
}
;(async () => {
    let movies = [
        { 
            doubanId: 25882296,
            title: '狄仁杰之四大天王',
            rate: 6.2,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2526405034.jpg' 
        },
        // { 
        //     doubanId: 27072795,
        //     title: '幸福的拉扎罗',
        //     rate: 8.6,
        //     poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2521583093.jpg' 
        // }
    ]

    movies.forEach(async movie => {
        let movieData = await fetchMovie(movie)
        try {
            movieData = JSON.parse(movieData)
            console.log('----movieData----')
            console.log(movieData.original_title)
            console.log(movieData.summary)
        } catch (err) { console.log(err) }
    })
})()