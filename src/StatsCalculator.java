import java.util.*;
public class StatsCalculator{
	
	
	public static void sop (Object x) {
		System.out.println(x);
	}

    public static void main(String args[]){
		
		Scanner scan = new Scanner (System.in);
		sop("Welcome to the Stats Calculator");
		sop("Please enter the appropriate letter for the type of calculation you want to do:");
		sop(" B - Basic Stats,"
				+ "\n ...,"
				+ "\n S - Sample Size");
		
		String response = scan.next();
		
		
		if (scan.next() == "B") {
			//mean, median, mode, range
		}
		
		//... code
		
		if (scan.next() == "S"){
			//insert SampleSize code
		}		
		
	
        
    }
}