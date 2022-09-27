
//cannot sort, does not implement comparable

public class SimpleSingleLinkList<E> implements ListADT<E> {

	private SingleLinkListNode<E> head;
	private SingleLinkListNode<E> tail;
	private int size;

	
	
	public SimpleSingleLinkList() {
		super();
		this.head = null;
		this.tail = null;
		size = 0;
	}


	public SingleLinkListNode<E> getHead() {
		return head;
	}




	public SingleLinkListNode<E> getTail() {
		return tail;
	}

	/**
	 * O(1)
	 * append the element e at the end
	 * @Override
	 */
	public void add(E data) {
		SingleLinkListNode<E> newNode = new SingleLinkListNode<E>(data, null);
		if(isEmpty())
			head = tail = newNode;
		else {
			tail.setNext(newNode);
			tail = newNode;
		}
		size++;
		

	}

	/**
	 * O(1)
	 * add the data to the beginning of list
	 * @Override
	 */
	public void prepend(E data) {
		SingleLinkListNode<E> newNode = new SingleLinkListNode<E>(data, null);
		
		if(isEmpty())
			head = tail = newNode;
		else {
			newNode.setNext(head);
			head = newNode;
		}
		size++;
		

	}

	/**
	 * 
	 * O(n)
	 * adding the new data at the location index
	 * if the indicated location is larger than the current size, data will be added
	 * to the end
	 * 
	 * @Override
	 */
	public void add(E data, int index) {
		if(index >= size)
			add(data);
		else if(index <= 0)
			prepend(data);
		else {
			SingleLinkListNode<E> current = head;
			for(int pos =0; pos < index - 1; pos++)
				current = current.getNext();
			SingleLinkListNode<E> newNode = new SingleLinkListNode<E>(data, null);
			newNode.setNext(current.getNext());
			current.setNext(newNode);
			size++;
		}

	}

	@Override
	public E remove(E data) {
		
		return remove(indexOf(data));
	}

	/**
	 * Remove the element at the location index
	 * if index is not within bounds, null is returned
	 * 
	 * O(n)
	 * 
	 * @Override
	 */
	public E remove(int index) {
		if(index >= size || index < 0)   //index is out of bounds
			return null;
		
		if(size == 1) {   //there is only one element in the list
			E data = head.getData();
			size--;
			head = tail = null;
			return data;
		}
		
		if(index == 0) {  //removing the first element (head)
			size--;
			E data = head.getData();
			head = head.getNext();
			if(size == 0)
				head = tail = null;
			return data;
		}
		
		if(index == size -1) {
			SingleLinkListNode<E> current = head;
			while(current.getNext() != tail)
				current = current.getNext();
			size--;
			E data = tail.getData();
			tail = current;
			tail.setNext(null);
			if(size == 0)
				head = tail = null;
			return data;
			
		}
		
		//the general case
		SingleLinkListNode<E> current = head;
		for(int pos =0; pos <index - 1; pos++)
			current = current.getNext();
		
		E data = current.getNext().getData();
		current.setNext(current.getNext().getNext());
		size--;
		return data;
		
	}

	@Override
	public int size() {
		return size;
	}

	@Override
	public boolean isEmpty() {
		return size == 0;
		
		//return head == null;
	}

	/**
	 * 
	 * O(n)
	 * 
	 * @Override
	 */
	public boolean contains(E data) {
		SingleLinkListNode<E> current = head;
		while(current != null) {
			if(current.getData().equals(data))
				return true;
			current = current.getNext();
		}
		
		return false;
	}



	@Override
	public String toString() {
		if(isEmpty())
			return "";
		
		String str = "[";
		SingleLinkListNode<E> current;
		
		current = head;
		str += current.getData().toString();
		current = current.getNext();
		
		while(current != null) {
			str += ", " + current.getData().toString();
			current = current.getNext();
		}
		str += "]";
		
		return str;
	}



	/**
	 * 
	 * Sequentially look for the element, return the position of the first occurrence
	 * return -1 if not found
	 * 
	 * O(n)
	 * @Override
	 */
	public int indexOf(E data) {
		SingleLinkListNode<E> current = head;
		int position = 0;
		while(current != null) {
			if(current.getData().equals(data))
				return position;
			current = current.getNext();
			position++;
		}
		return -1;  // data was not found
	}



	/**
	 * removes and returns the first element
	 * if list is empty, null is returned
	 * 
	 * O(n)
	 * @Override
	 */
	public E removeFirst() {
		return remove(0);
	}



	/**
	 * reverses the list
	 * It does not do it in place.  It creates a new list
	 * May want to change and improve the algorithm later
	 * 
	 * O(n)
	 * 
	 * @Override
	 */
	public void reverse() {
		if(size <= 1)
			return;   //nothing to do here
		
		SimpleSingleLinkList<E> newList = new SimpleSingleLinkList<E>();
		SingleLinkListNode<E> current = head;
		while(current != null) {
			newList.prepend(current.getData());
			current = current.getNext();
		}
		head = newList.getHead();
		tail = newList.getTail();		
	}


	@Override
	public void sort() {
		// sort not applicable
		
	}


    /**
     * 
     * O(n^2)
     * 
     */
	/*
	public void sort() {
		if(size <= 1)
			return;
		
		SingleLinkListNode<E> node = head.getNext();
		SingleLinkListNode<E> prev = head;
		
		
		while(node != null) {
			while(node != null && (node.getData().compareTo(prev.getData()) >= 0)) {
				node = node.getNext();
				prev = prev.getNext();
			}
			if(node == null)
			  break;
			prev.setNext(node.getNext());
			
			if(node == tail) {
				tail = prev;
				tail.setNext(null);
			}
			//insert node in its right location
			insertInOrderHelper(node);
			
			node = prev.getNext();
			
		}
		
		
	}
*/
	


}

