
public class ListTester {

	public static void main(String[] args) {
		MyArrayList<String> list1 = new MyArrayList<String>(2);
		
		SingleLinkList<String> list2 = new SingleLinkList<String>();

		list1.add("Jane");
		list1.add("Bob");
		list1.add("Al");
		list1.add("Sue");
		list1.add("Sam");
		list1.add("Dale");
		list1.add("Janet");
		list1.add("Kim");
		list1.add("Kim");
		list1.add("Zack", 3);
		
		System.out.println(list1);
		list1.reverse();
		
		System.out.println(list1);


		list2.add("Jane");
		list2.add("Bob");
		list2.add("Al");
		list2.add("Sue");
		list2.add("Sam");
		list2.add("Dale");
		list2.add("Janet");
		list2.add("Kim");
		list2.add("Zack", 3);
		
		list2.sort();
		System.out.println(list2);


		
		DoubleLinkList<String> list3 = new DoubleLinkList<String>();

		list3.add("Jane");
		list3.add("Bob");
		list3.add("Al");
		list3.add("Sue");
		list3.add("Sam");
		list3.add("Dale");
		list3.add("Janet");
		list3.add("Kim");
		list3.add("Kim");
		list3.add("Zack", 3);
		System.out.println("list3: " + list3);
		list3.add("Adam", 3);
		System.out.println("list3: " + list3);


	}

}
