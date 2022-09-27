
public class StackDemo {

	public static void main(String[] args) {
		Stack<String> stack;
		
		stack = new Stack<String>();
		
		stack.push("Jane");
		stack.push("Joe");
		stack.push("Sam");
		stack.push("Betty");
		stack.push("Adam");
		
		System.out.println(stack.peek());
		System.out.println(stack.size());

		while(!stack.isEmpty()) {
			System.out.println(stack.pop());
		}
		
		System.out.println(stack.isEmpty());
		
	}

}
