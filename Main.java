import java.util.Scanner;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // 縦の長さを入力
        int a = sc.nextInt();
        // 横の長さを入力
        int b = sc.nextInt();
        // 面積を計算
        int menseki = a * b;
        // 周の長さを計算
        int shu = 2 * (a + b);
        // 結果を出力
        System.out.println(menseki + " " + shu);
    }
}