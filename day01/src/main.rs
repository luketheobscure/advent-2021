use itertools::Itertools;

fn parsed_lines() -> impl Iterator<Item = u32> {
    include_str!("../input.txt")
        .lines()
        .map(|l| l.parse::<u32>().unwrap())
}

pub fn main() {
    println!(
        "Part 1: {}",
        parsed_lines()
            .tuple_windows()
            .filter(|(a, b)| a < b)
            .count()
    );

    println!(
        "Part 2: {}",
        parsed_lines()
            .tuple_windows::<(u32, u32, u32)>()
            .map(|(a, b, c)| a + b + c)
            .tuple_windows::<(u32, u32)>()
            .filter(|(a, b)| a < b)
            .count()
    );
}
