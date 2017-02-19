High Five

There are two properties in the node student id and scores, to ensure that each student will have at least 5 points, find the average of 5 highest scores for each person.

Have you met this question in a real interview? Yes
Example
Given results = [[1,91],[1,92],[2,93],[2,99],[2,98],[2,97],[1,60],[1,58],[2,100],[1,61]]

Return 
Tags 
Heap Amazon
Related Problems 
Medium Top k Largest Numbers

/**
 * Definition for a Record
 * class Record {
 *     public int id, score;
 *     public Record(int id, int score){
 *         this.id = id;
 *         this.score = score;
 *     }
 * }
 */
// having a max heap to hold the top 5 largest score
// how to add one more to it, find the smallest one, 
// if the new score > the smallest score, replace it
public class Solution {
    /**
     * @param results a list of <student_id, score>
     * @return find the average of 5 highest scores for each person
     * Map<Integer, Double> (student_id, average_score)
     */
    public Map<Integer, Double> highFive(Record[] results) {
        Map<Integer, Double> answer = new HashMap<Integer, Double>();
        Map<Integer, List<Integer>> hash = new HashMap<Integer, List<Integer>>();

        for (Record r : results) {
            if (!hash.containsKey(r.id)) {
                hash.put(r.id, new ArrayList<Integer>());
            }
            if (hash.get(r.id).size() < 5) {
                hash.get(r.id).add(r.score);
            } else {
            // find the smallest score in the 5 score and replace it with r.score
            // if r.score > the smallest score
                int index = 0;
                for (int i = 1; i < 5; i++) {
                    if (hash.get(r.id).get(i) < hash.get(r.id).get(index)) {
                        index = i;
                    }
                }
                if (hash.get(r.id).get(index) < r.score) {
                    hash.get(r.id).set(index, r.score);
                }
            }
        }

        for (Map.Entry<Integer, List<Integer>> entry : hash.entrySet()) {
            int id = entry.getKey();
            List<Integer> scores = entry.getValue();
            double average = 0;
            for (int j = 0; j < 5; j++) {
                average += scores.get(j);
            }
            average = average / 5.0;
            answer.put(id, average);
        }
        return answer;
    }
}
