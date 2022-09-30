mod minimum_moves;
mod football_scores;

pub fn run_demo() {
    let ans = minimum_moves::minimum_moves(vec![123, 543], vec![321, 279]);
    println!("{ans}");

    let ans = football_scores::counts(vec![1,2,3], vec![2,4]);
    println!("{:?}", ans)
}