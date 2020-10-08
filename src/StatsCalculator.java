import java.util.*;

public class StatsCalculator {

	public static void sop(Object x) {
		System.out.println(x);
	}

	public static int fact(int n) {

		int fact = 1;

		for (int i = 1; i <= n; i++) {
			fact = fact * i;
		}

		return fact;
	}

	public static int perm(int n, int r) {
		int perm = fact(n) / fact(n - r);

		return perm;
	}

	public static int comb(int n, int r) {
		int comb = fact(n) / (fact(r) * fact(n - r));

		return comb;
	}

	public static void main(String args[]) {

		@SuppressWarnings("resource")
		Scanner scan = new Scanner(System.in);
		sop("Welcome to the Stats Calculator");
		sop("Please enter the appropriate letter for the type of calculation you want to do:");
		sop(" B - Basic Stats," + "\n P - Permutations and Combinations," + "\n S - Sample Size");

		String response = scan.next();

		if (response.equals("B") || response.equals("b")) {
			sop("Which measure of data you want to calculate: mean, median, mode, range");
			String answer = scan.next();

			// finding mean
			if (answer.equals("mean")) {
				double sum = 0;
				int count = 0;

				// keep entering values until user presses q
				try {
					System.out.println("Enter the numbers. Type 'q' to quit");

					while (scan.hasNext()) {
						if (scan.hasNextDouble()) {
							sum = sum + scan.nextDouble();
							count++;
						} else {
							String input = scan.next();
							if (input.equalsIgnoreCase("q")) {
								double mean = sum / count;

								System.out.println("The mean is " + mean);
								break;

							} else {
								System.out.println("Your input is invalid. Please enter a number or press q to quit");
							}
						}
					}

				} catch (Exception e) {
					System.out.println("Exiting Program.");
				}
			}

			// finding median
			if (answer.equals("median")) {
				sop("How many numbers do you want to find the median of? ");
				int size = scan.nextInt();
				int[] arr = new int[size];
				sop("Enter the numbers: ");
				for (int i = 0; i < size; i++) {
					arr[i] = scan.nextInt();
				}
				sop("Original entry: " + Arrays.toString(arr));

				Arrays.sort(arr);
				sop("Sorted entry: " + Arrays.toString(arr));

				int n = arr.length;
				double median = 0;

				// check if array size is even
				if (n % 2 != 0)
					median = (double) arr[n / 2];

				// if array size is odd
				median = (double) (arr[(n - 1) / 2] + arr[n / 2]) / 2.0;

				sop("The median is " + median);
			}

			// finding mode
			if (answer.equals("mode")) {
				sop("How many numbers do you want to find the mode of? ");
				int size = scan.nextInt();
				int[] arr = new int[size];
				sop("Enter the numbers: ");
				for (int i = 0; i < size; i++) {
					arr[i] = scan.nextInt();
				}
				sop("Original entry: " + Arrays.toString(arr));

				Arrays.sort(arr);
				sop("Sorted entry: " + Arrays.toString(arr));
				int maxNum = 0, maxCount = 0, i, j;
				int l = arr.length;

				for (i = 0; i < l; ++i) {
					int count = 0;
					for (j = 0; j < l; ++j) {
						if (arr[j] == arr[i])
							++count;
					}

					if (count > maxCount) {
						maxCount = count;
						maxNum = arr[i];
					}
				}

				System.out.println("The mode is " + maxNum);
			}

			// finding range
			if (answer.equals("range")) {
				sop("How many numbers do you want to find the range of? ");
				int size = scan.nextInt();
				int[] arr = new int[size];
				sop("Enter the numbers: ");
				for (int i = 0; i < size; i++) {
					arr[i] = scan.nextInt();
				}
				sop("Original entry: " + Arrays.toString(arr));

				Arrays.sort(arr);
				sop("Sorted entry: " + Arrays.toString(arr));

				int a = arr[0], z = arr[size - 1];
				int range = z - a;

				sop("The range is " + range);
			}
		}

		if (response.equals("P") || response.contentEquals("p")) {
			sop("Enter 'perm' if you want to find the permutation \n\t (order matters)"
					+ "\nor enter 'comb' if you want to find the combination of a set \n\t (order does not matter)");
			String answer = scan.next();

			// Permutation
			if (answer.equals("perm")) {
				System.out.println("Enter total number of objects in the set (n): ");
				int num = scan.nextInt();
				System.out.println("Enter number of objects being chosen from the set (r): ");
				int chosen = scan.nextInt();

				System.out.println("nPr = " + perm(num, chosen));

			}

			// Combination
			if (answer.equals("comb")) {
				System.out.println("Enter total number of objects in the set (n): ");
				int num = scan.nextInt();
				System.out.println("Enter number of objects being chosen from the set (r): ");
				int chosen = scan.nextInt();

				System.out.println("nCr = " + comb(num, chosen));

			}
		}

		if (response.equals("S") || response.equals("s")) {
			double p, q, z, w;
			int n;

			sop("Enter p value: ");
			p = scan.nextDouble();

			q = 1 - p;

			sop("Enter z value: ");
			z = scan.nextDouble();

			sop("Enter width: ");
			w = scan.nextDouble();

			double nPlus;

			nPlus = (2 * Math.pow(z, 2) * p * q - Math.pow(z, 2) * Math.pow(w, 2)
					+ Math.sqrt(
							4 * Math.pow(z, 4) * p * q * (p * q - Math.pow(w, 2)) + Math.pow(w, 2) * Math.pow(z, 4)))
					/ Math.pow(w, 2);

//			nMinus = (2*Math.pow(z, 2)*p*q - Math.pow(z, 2)*Math.pow(w,2)- Math.sqrt(4*Math.pow(z, 4)*p*q*(p*q-Math.pow(w, 2))
//					+Math.pow(w, 2)*Math.pow(z, 4))) / Math.pow(w, 2);

			sop("The necessary sample size is " + nPlus);

			double percent = p * 100;
			percent = Math.round(percent * 10.00) / 10.00;

			sop("Enter size: ");
			n = scan.nextInt();

			sop("\nIf a " + percent + " % of " + n + " individuals have done something,");

			double ciMinus = p - z * Math.sqrt((p * q) / n);
			double ciPlus = p + z * Math.sqrt((p * q) / n);

			// this rounds the CI values to 4 decimal places
			ciMinus = Math.round(ciMinus * 10000.00) / 10000.00;
			ciPlus = Math.round(ciPlus * 10000.00) / 10000.00;

			sop("\tthe confidence interval is (" + ciMinus + "," + ciPlus + ")");

		}

	}
}
