import { ColorResolvable, EmbedBuilder, User } from 'discord.js'
import { salesforce } from '../index'
import { AnimeImage } from './AnimeImage'

const COMMANDCHAR : string = './'
const EMBEDCOLOR : ColorResolvable = 'LuminousVividPink'

const MentionsCommands : readonly string[] = Object.freeze([
    'KISS', 'HUG', 'SLAP', 'PUNCH', 'WINK', 'PAT', 'KILL',
    'CUDDLE', 'BITE', 'COOKIE', 'LICK', 'POKE', 'SPANK', 'TICKLE'
])

export default class MessageCommand {
    public static async CheckAnime(content : string, author : string, clientUser : string, userMention : string | undefined) : Promise<any> {
        if(!content.startsWith(COMMANDCHAR)) return undefined

        const commName : string = content.split(' ')[0].substring(COMMANDCHAR.length)
        if(userMention && MentionsCommands.includes(commName.toUpperCase())) {
            const animeAPI : AnimeImage = new AnimeImage()
            let contStr : string = ''
            switch (MentionsCommands.indexOf(commName.toUpperCase())) {
                case 0:
                    await animeAPI.get('KISS')
                    contStr = userMention == author ? 
                        '**Aww, I see you are lonely, _kisses_**' : userMention == clientUser ?
                        '**_blushes_... I- uh... don\'t think you should be kissing a bot but...**' :
                        `:speech_balloon: **${userMention}** you have been kissed by **${author}**`
                    break
                case 1:
                    await animeAPI.get('HUG')
                    contStr = userMention == author ?
                        '**Aww, I see you are lonely, take a hug <3**' : userMention == clientUser ?
                        '**_blushes_ o-oh... thanks you**' :
                        `:speech_balloon: **${userMention}** you have been hugged by **${author}**`
                    break
                case 2:
                    await animeAPI.get('SLAP')
                    contStr = userMention == author ?
                        '**Hmm, why do you want this? Uh, I guess... _slaps you_**' : userMention == clientUser ?
                        '**:(**' : `:speech_balloon: **${userMention}** you have been slapped by **${author}**`
                    break
                case 3:
                    await animeAPI.get('PUNCH')
                    contStr = userMention == author ?
                        '**Hmm, why do  you want this? Uh, I guess... _punches you_**' : userMention == clientUser ?
                        '**:(!**' : `:speech_balloon: **${userMention}** you have been punched by **${author}**`
                    break
                case 4:
                    await animeAPI.get('WINK')
                    contStr = userMention == author ?
                        '**You\'re looking cute today... _winks_**' : userMention == clientUser ?
                        '**_blushes_ o-oh... thank you**' :
                        `:speech_balloon: **${userMention}** you have been winked at by **${author}**`
                    break
                case 5:
                    await animeAPI.get('PAT')
                    contStr = userMention == author ?
                        '**Aww, I see you are lonely, take a pat <3**' : userMention == clientUser ?
                        '**_is patted_**'  :
                        `:speech_balloon: **${userMention}** you have been patted by **${author}**`
                    break
                case 6:
                    await animeAPI.get('KILL')
                    contStr = userMention == author ?
                        '**A-are you sure... ? _kills you_ owo!**' : userMention == clientUser ?
                        '**W-What did I do? :( _dies_**' :
                        `:speech_balloon: **${userMention}**  you have been killed by **${author}**`
                    break
                case 7:
                    await animeAPI.get('CUDDLE')
                    contStr = userMention == author ?
                        '**_cuddles you_**' : userMention == clientUser ?
                        '**That\'s cute!**' : `:heart: **${userMention}** you have been cuddled by **${author}**`
                    break
                case 8:
                    await animeAPI.get('BITE')
                    contStr = userMention == author ?
                        '**_bites you_**' : userMention == clientUser ?
                        '**T-That hurts!**' :
                        `:speech_balloon: **${userMention}** you have been bitten by **${author}** :eyes:`
                    break
                case 9:
                    await animeAPI.get('COOKIE')
                    contStr = userMention == author ?
                        '**Here, have a cookie :)**' : userMention = clientUser ?
                        '**A cookie? For me? owo Thankies~**' :
                        `:speech_balloon: **${userMention}**, **${author}** has given you a cookie!`
                    break
                case 10:
                    await animeAPI.get('LICK')
                    contStr = userMention == author ?
                        '**_blushes_ U-Uhmm... if that\'s really what you want... _licks you_**' : userMention == clientUser ?
                        '**W-What are you doing~? _blushes_**' :
                        `:speech_balloon: **${userMention}** you have been licked by **${author}**`
                    break
                case 11:
                    await animeAPI.get('POKE')
                    contStr = userMention == author ?
                        '**_pokes you_**' : userMention == clientUser ?
                        '**Hey! Why are you poking me?**' :
                        `:speech_balloon: **${userMention}** you have been poked by **${author}**`
                    break
                case 12:
                    await animeAPI.get('SPANK')
                    contStr = userMention == author ?
                        '**_spanks you_**' : userMention == clientUser ?
                        '**Hey! D-Don\'t spank meeee~ :(**' :
                        `:speech_balloon: **${userMention}** you have been spanked by **${author}**`
                    break
                case 13:
                    await animeAPI.get('TICKLE')
                    contStr = userMention == author ?
                        '**You will recieve no mercy! >:) _tickles you_**' : userMention == clientUser ?
                        '**HAHAHAHAAAHAHHHAHAHAA PLEASE STOP HAHHAHAAHHAHAHAAAHAHAHAAHAA**' :
                        `:speech_balloon: **${userMention}** you have been tickled by **${author}**`
                    break
                default:
                    return undefined
            }

            return {
                content : contStr,
                embeds   : [new EmbedBuilder().setImage(animeAPI.image_url).setColor(EMBEDCOLOR)]
            }
        }
    }

    public static async CheckBudget(content : string, author : User) : Promise<string | undefined> {
        if(content.toLowerCase().startsWith(`${COMMANDCHAR}add expense`) && content.split(' ').length == 3) {
            if(Number.isNaN(content.split(' ')[2])) return '**Please give me a valid number to add as an expense**'
            await salesforce.checkAuth()
            const val : number = +content.split(' ')[2]
            const exists : any = await salesforce.query(`SELECT+Id+FROM+Budget__c+WHERE+User_ID__c='${author.id}'`)
            if(exists.totalSize && exists.totalSize == 0) {
                const newBudgetBody : any = {
                    'Name'      : `${author.username}'s Budget`,
                    'User_ID__c'   : `${author.id}`
                }
                const budgetResult : any = await salesforce.insert('Budget__c', newBudgetBody)
                if(budgetResult.hasOwnProperty('id')) {
                    const expenseBody : any = {
                        'Budget__c' : budgetResult.Id,
                        'Value__c'  : val
                    }
                    const expenseResult : any = await salesforce.insert('Expense__c', expenseBody)
                    if(expenseResult.hasOwnProperty('id')) {
                        return `**Expense added successfuly!**\n**For more budget commands type '${COMMANDCHAR}budget help'**`
                    } else {
                        console.error('Error: ', expenseResult)
                        return `${author} **I'm sorry, something went wrong when I tried to insert your expense :(**`
                    }
                } else {
                    console.error('Error: ', budgetResult)
                    return `${author} **You didn\'t have a Budget yet, but something went wrong when we tried to create one for you :(**`
                }
            } else if(exists.totalSize && exists.totalSize == 1) {
                const expenseBody : any = {
                    'Budget__c' : exists.records[0].Id,
                    'Value__c'  : val
                }
                const expenseResult : any = await salesforce.insert('Expense__c', expenseBody)
                if(expenseResult.hasOwnProperty('id')) {
                    return `**Expense added successfuly!**\n**For more budget commands type '${COMMANDCHAR}budget help'**`
                } else {
                    console.error('Error: ', expenseResult)
                    return `${author} **I'm sorry, something went wrong when I tried to insert your expense :(**`
                }
            } else {
                console.error('Error: ', exists)
                return '**Sorry, something went wrong and I could not even start this command :(**'
            }
        } else if(content.toLowerCase().startsWith(`${COMMANDCHAR}add income`) && content.split(' ').length == 3) {
            if(Number.isNaN(content.split(' ')[2])) {
                return '**Please give me a valid number to add as an income**'
            }
            await salesforce.checkAuth()
            const val : number = +content.split(' ')[2]
            const exists : any = await salesforce.query(`SELECT+Id+FROM+Budget__c+WHERE+User_ID__c='${author.id}'`)
            if(exists.totalSize && exists.totalSize == 0) {
                const newBudgetBody : any = {
                    'Name'      : `${author.username}'s Budget`,
                    'User_ID__c'   : `${author.id}`
                }
                const budgetResult : any = await salesforce.insert('Budget__c', newBudgetBody)
                if(budgetResult.hasOwnProperty('id')) {
                    const incomeBody : any = {
                        'Budget__c' : budgetResult.Id,
                        'Value__c'  : val
                    }
                    const incomeResult : any = await salesforce.insert('Income__c', incomeBody)
                    if(incomeResult.hasOwnProperty('id')) {
                        return `**Income added successfuly!**\n**For more budget commands type '${COMMANDCHAR}budget help'**`
                    } else {
                        console.error('Error: ', incomeResult)
                        return `${author} **I'm sorry, something went wrong when I tried to insert your income :(**`
                    }
                } else {
                    console.error('Error: ', budgetResult)
                    return `${author} **You didn\'t have a Budget yet, but something went wrong when we tried to create one for you :(**`
                }
            } else if(exists.totalSize && exists.totalSize == 1) {
                const incomeBody : any = {
                    'Budget__c' : exists.records[0].Id,
                    'Value__c'  : val
                }
                const incomeResult : any = await salesforce.insert('Income__c', incomeBody)
                if(incomeResult.hasOwnProperty('id')) {
                    return `**Income added successfuly!**\n**For more budget commands type '${COMMANDCHAR}budget help'**`
                } else {
                    console.error('Error: ', incomeResult)
                    return `${author} **I'm sorry, something went wrong when I tried to insert your income :(**`
                }
            } else {
                console.error('Error: ', exists)
                return '**Sorry, something went wrong and I could not even start this command :(**'
            }
        } else return undefined
    }

    public static async checkGamble(content : string, author : User) : Promise<string | string[] | undefined> {
        if(content.startsWith(`${COMMANDCHAR}gamble `) && content.split(' ').length == 2) {
            const bet : number = +content.split(' ')[1]
            if(Number.isNaN(bet)) return '**Please enter a valid number**'
            
            await salesforce.checkAuth()
            
            const userPoints : Number = await salesforce.doPost('services/apexrest/GetPoints', { 'UserID' : author.id, 'UpdatePoints' : null })
            if(userPoints < bet) return `**You don't have enough points to make that bet. Currently you have _${userPoints}_ points**`
            
            const winningNum : number = Math.floor(Math.random() * 20)
            if(Math.floor(Math.random() * 20) == winningNum) {
                const newUserPoints : Number = await salesforce.doPost('services/apexrest/GetPoints', { 'UserID' : author.id, 'UpdatePoints' : bet })
                return [`**Congratulations ${author}! You won!!**`, `**You now have _${newUserPoints}_ points!**`]
            } else {
                const newUserPoints : Number = await salesforce.doPost('services/apexrest/GetPoints', { 'UserID' : author.id, 'UpdatePoints' : (bet * -1) })
                return ['**Sorry :( Better luck next time**', `**Your new points value is _${newUserPoints}_**`]
            }
        } else if(content == `${COMMANDCHAR}cheat` && author.id == '225033472169869334') {
            await salesforce.checkAuth()
            const userPoints : Number = await salesforce.doPost('services/apexrest/GetPoints', { 'UserID' : author.id , 'UpdatePoints' : 100000 })
            return `**Here you are sir _William_, I've given you _100000_ points! You now have _${userPoints}_ points :)**`
        } else return undefined
    }
}