
public class Stack<E> implements StackADT<E> {
	
	//a single link list is used to implement the stack
	//the head of the list indicates the top of the stack
	
	private SimpleSingleLinkList<E>  list;	
	
	
	public Stack() {
		list = new SimpleSingleLinkList<E>();
	}
	
	

	/**
	 * add the element to the head (top) of the stack
	 * O(1)
	 * @Override
	 */
	public void push(E e) {
		list.add(e, 0);
		
	}

	/**
	 * remove (pop) the head element
	 * O(1)
	 * @Override
	 */
	public E pop() {
		return list.remove(0);
	}

	/**
	 * 
	 * return the data of the top element without removing it
	 * O(1)
	 * @Override
	 */
	public E peek() {
		return list.getHead().getData();
	}

	/**
	 * O(1)
	 * @Override
	 */
	public int size() {
		// TODO Auto-generated method stub
		return list.size();
	}

	@Override
	public boolean isEmpty() {
		return list.isEmpty();
	}
	

}
