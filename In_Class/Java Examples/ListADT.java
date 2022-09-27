
/**
 * Recording the list ADT
 * 
 * @author bgolshan
 *
 * @param <E>
 */
public interface ListADT<E> {
	/**
	 * add element e to the end of the list
	 * @param e
	 */
	public void add(E e);
	/**
	 * adds e to the beginning of the list
	 * @param e
	 */
	public void prepend(E e);
	/**
	 * add the element e at location index i
	 * @param e
	 * @param i
	 */
	public void add(E e, int i);
	
	/**
	 * remove the first occurrence of e and return it
	 * @return
	 */
	public E remove(E e);
	
	/**
	 * remove element at location i and return it
	 * @return
	 */
	public E remove(int i);
	/**
	 * remove the first element and return it
	 * @return
	 */
	public E removeFirst();
	/**
	 * return the size of the list
	 * @return
	 */
	public int size();
	/**
	 * return true only if the list is empty
	 * @return
	 */
	public boolean isEmpty();
	/**
	 * returns true only if the list contains the element e
	 * @param e
	 * @return
	 */
	public boolean contains(E e);
	/**
	 * sorts the list
	 */
	public void sort();
	/**
	 * return the index of the first occurrence of e
	 * return -1 if list does not contain e
	 * @param e
	 * @return
	 */
	public int indexOf(E e);

	/**
	 * reverse the elements in the list
	 */
	public void reverse();

}

