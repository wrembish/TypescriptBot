const Anime_Images : any = require('anime-images-api')
class AnimeImages extends Anime_Images { constructor() { super() } }
enum ImageCategory {
    ANGRY = 0, ANIME = 1, BITE = 2, BORED = 3, BREAD = 4, CHOCOLATE = 5,
    COOKIE = 6, DANCE = 7, DRUNK = 8, HAPPY = 9, LAUGH = 10, LICK = 11,
    LONELY = 12, POKE = 13, PREGNANT = 14, RUN = 15, SATOUSELFIES = 16,
    SLEEP = 17, SPANK = 18, SPIT = 19, STEAL = 20, TICKLE = 21, NOMM = 22,
    CUDDLE = 23, KILL = 24, PAT = 25, PUNCH = 26, SLAP = 27, KISS = 28, 
    HUG = 29, WINK = 30, WAIFU = 31, HENTAI = 32, BOOBS = 33, LESBIAN = 34
}

export type AnimeImageCategory = keyof typeof ImageCategory

const APIPREFIX : string = 'https://api.satou-chan.xyz/api/endpoint/'

export class AnimeImage {
    public image_url : string
    private animeAPI : AnimeImages

    constructor() {
        this.image_url = ''
        this.animeAPI = new AnimeImages()
    }

    public async get(ImageType : AnimeImageCategory) : Promise<void> {
        const otherAPI : boolean = 
            ImageCategory[ImageType] > 22 &&
            ImageCategory[ImageType] < 29 &&
            (Math.floor(Math.random() * 100) + 1) % 2 == 1

        if(!otherAPI && ImageCategory[ImageType] < 29) {
            await fetch(`${APIPREFIX}/${ImageType.toLowerCase()}`)
                .then((response : Response) : any => response.json())
                .then((data : any) : void => { this.image_url = data.url })
                .catch((error : any) : void => { console.error('Error: ', error) })
        } else {
            let result : any
            switch (ImageCategory[ImageType]) {
                case 23:
                    result = await this.animeAPI.sfw.cuddle()
                    this.image_url = result.image
                    break
                case 24:
                    result = await this.animeAPI.sfw.kill()
                    this.image_url = result.image
                    break
                case 25:
                    result = await this.animeAPI.sfw.pat()
                    this.image_url = result.image
                    break
                case 26:
                    result = await this.animeAPI.sfw.punch()
                    this.image_url = result.image
                    break
                case 27:
                    result = await this.animeAPI.sfw.slap()
                    this.image_url = result.image
                    break
                case 28:
                    result = await this.animeAPI.sfw.kiss()
                    this.image_url = result.image
                    break
                case 29:
                    result = await this.animeAPI.sfw.hug()
                    this.image_url = result.image
                    break
                case 30:
                    result = await this.animeAPI.sfw.wink()
                    this.image_url = result.image
                    break
                case 31:
                    result = await this.animeAPI.sfw.waifu()
                    this.image_url = result.image
                    break
                case 32:
                    result = await this.animeAPI.nsfw.hentai()
                    this.image_url = result.image
                    break
                case 33:
                    result = await this.animeAPI.nsfw.boobs()
                    this.image_url = result.image
                    break
                case 34:
                    result = await this.animeAPI.nsfw.lesbian()
                    this.image_url = result.image
                    break
                default:
                    console.error('Something went wrong, the number is outside of the available range')
            }
        }
    }
}