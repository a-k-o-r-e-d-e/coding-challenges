pub fn counts (mut team_a: Vec<i32>, team_b: Vec<i32>) -> Vec<isize> {
    team_a.sort();

    let mut result = vec![];

    // let mut cache = HashMap::new();

    for value in team_b {
        let mut bound:isize = -1;
        let mut left = 0;
        let mut right = team_a.len()-1;
        while left <= right {
            let mid = left + ((right - left)/2);

            if team_a[mid] <= value {
                bound = mid as isize;

                left = mid +1;
            } else {
                right = mid-1;
            }
        }
        result.push(bound+1);
    }

    result
}