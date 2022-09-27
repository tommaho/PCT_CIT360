import java.util.Arrays;

/**
 * Using a simple array to implement the ListADT
 * 
 * @author bgolshan
 *
 * @param <E>
 */
public class MyArrayList<E> implements ListADT<E> {

	final int DEFAULT_SIZE = 10;
	private E[] list;
	private int size; // the actual number of element sin the list
	private int capacity;

	/**
	 * default constructor, builds a list with default capacity
	 */
	public MyArrayList() {
		super();
		list = (E[]) new Object[DEFAULT_SIZE];
		capacity = DEFAULT_SIZE;
		size = 0;

		// TODO Auto-generated constructor stub
	}

	/**
	 * default constructor, builds a list with user-specified initial capacity
	 */
	public MyArrayList(int initialCapacity) {
		super();
		list = (E[]) new Object[initialCapacity];
		capacity = initialCapacity;
		size = 0;

		// TODO Auto-generated constructor stub
	}

	/**
	 * add the new element to the end of the list
	 * 
	 * 
	 * O(n)
	 * 
	 * @Override
	 */
	public void add(E e) {

		if (size == capacity)
			increaseCapacity();

		list[size] = e;
		size++;

	}

	/**
	 * O(n)
	 * 
	 * @Override
	 */
	public void prepend(E e) {

		add(e, 0);

	}

	/**
	 * O(n)
	 * 
	 * @Override
	 */
	public void add(E e, int i) {
		if (size == capacity)
			increaseCapacity();
		for (int j = size; j > i; j--) {
			list[j] = list[j - 1];
		}
		list[i] = e;
	}

	/**
	 * removes the first occurrence of e, if exists return deleted element, null if
	 * does not exist
	 * 
	 * @Override
	 */
	public E remove(E e) {

		for (int i = 0; i < size; i++) {
			if (list[i].equals(e)) { // E type needs to have written the .equals method
				// element exists, remove it
				for (int j = i; j < size; j++) {
					list[j] = list[j + 1];
				}
				size--;
				return e;
			}
		}
		return null;
	}

	@Override
	public E remove(int i) {
		// students complete this
		return null;
	}

	@Override
	public E removeFirst() {
		return remove(0);
	}

	@Override
	public int size() {
		return size;
	}

	/**
	 * O(1)
	 * 
	 * @Override
	 */
	public boolean isEmpty() {
		return size == 0;
	}

	/**
	 * O(n)
	 * 
	 * @Override
	 */
	public boolean contains(E e) {
		for (int i = 0; i < size; i++) {
			if (list[i].equals(e))
				return true;
		}
		return false;
	}

	@Override
	public void sort() {
		// students complete this

	}

	/**
	 * returns the first index of e return -1 if e is not in the list
	 * 
	 * O(n)
	 * 
	 * @Override
	 */
	public int indexOf(E e) {
		for (int i = 0; i < size; i++) {
			if (list[i].equals(e))
				return i;
		}
		return -1;
	}

	/**
	 * 
	 * O(n)
	 * 
	 * @Override
	 */
	public void reverse() {
		int mid = size / 2;
		E temp;

		for (int i = 0; i < mid; i++) {
			temp = list[i];
			list[i] = list[size - i - 1];
			list[size - i - 1] = temp;
		}

	}

	/**
	 * O(n) algorithm
	 */
	private void increaseCapacity() {
		E[] newList = (E[]) new Object[2 * capacity];
		for (int i = 0; i < size; i++) {
			newList[i] = list[i];
		}
		capacity *= 2;
		list = newList;
	}

	@Override
	public String toString() {
		// needs to be written properly
		String str = "[";
		for (int i = 0; i < size; i++)
			str += ( list[i].toString() + ", ");
		str += "]";
		return str;

	}
}
