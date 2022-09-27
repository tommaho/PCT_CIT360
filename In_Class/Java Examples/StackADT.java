

public interface StackADT<E> {
	
	/**
	 * add a new element to the top  of the stack
	 * @param e
	 */
	public void push(E e);
	
	/**
	 * removing and returning the top element
	 * @return
	 */
	public E pop();
	
	/**
	 * return the top element without removing it
	 * @return
	 */
	public E peek();
	
	/**
	 * return the size of the stack
	 * @return
	 */
	public int size();
	
	/**
	 * return true only if stack is empty
	 * @return
	 */
	public boolean isEmpty();
	

}

