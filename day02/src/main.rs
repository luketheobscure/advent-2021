fn parsed_lines() -> impl Iterator<Item = String> {
    include_str!("../input.txt")
        .lines()
        .map(|l| l.parse::<String>().unwrap())
}

fn main() {
    println!("Hello, world!");

    let mut x = 0;
    let mut y = 0;

    for line in parsed_lines() {
        let (direction, amount_str) = line.split_once(" ").unwrap();
        let amount = amount_str.parse::<u32>().unwrap();

        match direction {
            "up" => y -= amount,
            "down" => y += amount,
            "forward" => x += amount,
            _ => panic!("Direction string not found."),
        }
    }

    println!("Part 1: {}", x * y);

    let mut x2 = 0;
    let mut y2 = 0;
    let mut aim = 0;

    for line in parsed_lines() {
        let (direction, amount_str) = line.split_once(" ").unwrap();
        let amount = amount_str.parse::<u32>().unwrap();

        match direction {
            "up" => aim -= amount,
            "down" => aim += amount,
            "forward" => {
                x2 += amount;
                y2 += amount * aim;
            }
            _ => panic!("Direction string not found."),
        }
    }

    println!("Part 2: {}", x2 * y2);
}
