/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

const initialState = [
        {
            id: 1,
            first: "Name",
            last: "Url",
            age: 71,
            description: "Bucky is a React developer and YouTuber",
            thumbnail: "http://i.imgur.com/7yUvePI.jpg"
        },
        {
            id: 2,
            first: "Name 2",
            last: "URl 2",
            age: 27,
            description: "Joby loves the Packers, cheese, and turtles.",
            thumbnail: "http://i.imgur.com/52xRlm8.png"
        },
        {
            id: 3,
            first: "Name 3",
            last: "Url 3",
            age: 24,
            description: "Madi likes her dog but it is really annoying.",
            thumbnail: "http://i.imgur.com/4EMtxHB.png"
        },
        {
            id: 4,
            first: "last ",
            last: "one",
            age: 24,
            description: "Madi likes her dog but it is really annoying.",
            thumbnail: "http://i.imgur.com/4EMtxHB.png"
        }
    ]


export default function (state = initialState, action) {
    switch (action.type) {
        case 'USER_ADD':
            return [state, ...action.payload];
            break;

        case 'USER_DELETE':
            const _state = state;
            break;
    }
    return state;
}
