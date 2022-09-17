use std::collections::HashMap;

// Print the lyrics to the Christmas carol 
// “The Twelve Days of Christmas,” taking advantage of the repetition in the song.
pub fn play() {
    let gifts = HashMap::from([
        (1, ("first", "A partridge in a pear tree")),
        (2, ("second", "Two turtledoves")),
        (3, ("third", "Three French hens")),
        (4, ("fourth", "Four calling birds")),
        (5, ("fifth", "Five gold rings (five golden rings)")),
        (6, ("sixth", "Six geese a-laying")),
        (7, ("seventh", "Seven swans a-swimming")),
        (8, ("eighth", "Eight maids a-milking")),
        (9, ("ninth", "Nine ladies dancing")),
        (10, ("tenth", "Ten lords a-leaping")),
        (11, ("eleventh", "I sent eleven pipers piping")),
        (12, ("twelfth", "Twelve drummers drumming")),
    ]);

    let mut previous_gifts = String::from("And a partridge in a pear tree");
    for day_index in 1..13 {
        if let Some((day_str, gift)) = gifts.get(&day_index) {
            println!("\nOn the {day_str} day of christmas, my true love sent to me \n{gift}");
            if day_index > 1 {
                println!("{previous_gifts}");
                let mut gift_str = if day_index != 11 {
                    gift.to_string()
                } else {
                    String::from("eleven pipers piping")
                };
                gift_str.push_str("\n");
                gift_str.push_str(&previous_gifts);
                previous_gifts = gift_str
            }
        }
    }

    println!("\nAnd a partridge in a pear tree");
}
