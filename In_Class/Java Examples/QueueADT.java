
public interface QueueADT<E> {
	
	/**
	 * add a new element to the rear of the queue
	 * @param e
	 */
	public void enqueue(E e);
	
	/**
	 * removing and returning the front of the queue
	 * @return
	 */
	public E dequeue();
	
	/**
	 * return the front element without removing it
	 * @return
	 */
	public E peek();
	
	/**
	 * return the size of the queue
	 * @return
	 */
	public int size();
	
	/**
	 * return true only if queue is empty
	 * @return
	 */
	public boolean isEmpty();
	

}
