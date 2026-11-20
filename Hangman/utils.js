import { words } from "./words"


export function getFarewellText(avenger) {
    const options = [
        `${avenger} fell from a skyscraper 🏙️`, 
        `Thoughts and prayers, ${avenger} 🙏`,
        `R.I.P. ${avenger} 🪦`,
        `We're going to miss ${avenger} ☹️`,
        `Oh no, not ${avenger}! 😱`,
        `${avenger} met their fate 🫩`,
        `Gone but not forgotten, ${avenger} 🖤`,
        `The end of ${avenger} as we know it 💔`,
        `Off into the sunset, ${avenger} 🌅`,
        `${avenger} fell to DOOM 💀`,
        `${avenger}'s watch has ended 🥺`,
        `${avenger} has died to DOOM's sentinel 🤖`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    const word = words[randomIndex];
    return (options[randomIndex]);
}