
public class DoubleLinkList<E extends Comparable<E>> implements ListADT<E> {

	private DoubleLinkListNode<E> head;
	private DoubleLinkListNode<E> tail;
	private int size;

	
	
	public DoubleLinkList() {
		super();
		this.head = null;
		this.tail = null;
		size = 0;
	}


	public DoubleLinkListNode<E> getHead() {
		return head;
	}


	public DoubleLinkListNode<E> getTail() {
		return tail;
	}

	/**
	 * append the element e at the end
	 * @Override
	 */
	public void add(E data) {
		DoubleLinkListNode<E> newNode = new DoubleLinkListNode<E>(data, null, null);
		if(isEmpty())
			head = tail = newNode;
		else {
			tail.setNext(newNode);
			newNode.setPrevious(tail);
			tail = newNode;
		}
		size++;		
	}

	/**
	 * add the data to the beginning of list
	 * @Override
	 */
	public void prepend(E data) {
		DoubleLinkListNode<E> newNode = new DoubleLinkListNode<E>(data, null, null);
		
		if(isEmpty())
			head = tail = newNode;
		else {
			head.setPrevious(newNode);
			newNode.setNext(head);
			head = newNode;
		}
		size++;
		

	}

	/**
	 * 
	 * adding the new data at the location index
	 * if the indicated location is larger than the current size, data will be added
	 * to the end
	 * 
	 * 
	 * O(n)
	 * 
	 * @Override
	 */
	public void add(E data, int index) {
		if(index >= size)  //append the element to the end
			add(data);
		
		else if(index <= 0)
			prepend(data);
		
		else {
			DoubleLinkListNode<E> current = head;
			for(int pos =0; pos < index - 1; pos++)
				current = current.getNext();
			
			DoubleLinkListNode<E> newNode = new DoubleLinkListNode<E>(data, null, null);
			
			newNode.setPrevious(current);
			newNode.setNext(current.getNext());		
			current.getNext().setPrevious(newNode);
			current.setNext(newNode);
			
			size++;
		}

	}

	/**
	 * O(n)   
	 * 
	 * @Override
	 */
	public E remove(E data) {
		
		return remove(indexOf(data));
	}

	/**
	 * Remove the element at the location index
	 * if index is not within bounds, null is returned
	 * 
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
			head.setPrevious(null);
			if(size == 0)
				head = tail = null;
			return data;
		}
		
		if(index == size -1) {  //removing the last element

			size--;
			E data = tail.getData();
			tail = tail.getPrevious();
			tail.setNext(null);
			if(size == 0)
				head = tail = null;
			return data;
			
		}
		
		//the general case
		DoubleLinkListNode<E> current = head;
		for(int pos =0; pos <index - 1; pos++)
			current = current.getNext();
		
		E data = current.getNext().getData();
		
		current.setNext(current.getNext().getNext());
		current.getNext().setPrevious(current);
		
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
	 * O(n)
	 * 
	 * @Override
	 */
	public boolean contains(E data) {
		DoubleLinkListNode<E> current = head;
		while(current != null) {
			if(current.getData().equals(data))
				return true;
			current = current.getNext();
		}
		
		return false;
	}

	
	public E removeLast() {
		return remove(size - 1);
	}
	
	
	@Override
	public void sort() {
		
		if(size <= 1)  //nothing to do here
			return;
		
		//sort the list using the insertion sort algorithm
		
		//DoubleLinkListNode<E> previous = head;
		DoubleLinkListNode<E> current = head.getNext();
		
		while (current != null) {
			if(current.getData().compareTo(current.getPrevious().getData()) >= 0)
				current = current.getNext();
			
			else {
				//current data is smaller and needs to be moved
				
				if(current == tail) { //tail needs to move inward 
					tail = tail.getPrevious();
					tail.setNext(null);
					current.setNext(null);
					current.setPrevious(null);
					insertInOrderHelper(current);
					//current = null;
					break;            //all done, ends the loop
					
				}
				else {
					DoubleLinkListNode<E> prev = current.getPrevious();
					prev.setNext(current.getNext());
					current.getNext().setPrevious(prev);
					current.setNext(null);
					current.setPrevious(null);
					insertInOrderHelper(current);
					current = prev.getNext();
					//insertInOrderHelper(current);

				}
			}
			
		}//while
		

	
	}

    /**
     * insert the node in its position 
     * assuming list is sorted
     * 
     * @param node
     */
	private void insertInOrderHelper(DoubleLinkListNode<E> node) {
		

		//System.out.println("reordering " + node.getData());
		if(node.getData().compareTo(head.getData()) <= 0) {
			//entering at the head
			node.setNext(head);
			head.setPrevious(node);
			head = node;
		}
		else {
			DoubleLinkListNode<E> current = head;
			
			while (current.getData().compareTo(node.getData()) < 0 &&
					current.getNext().getData().compareTo(node.getData()) < 0)
				current = current.getNext();
			
			
			//node needs to be inserted after current
			node.setNext(current.getNext());
			current.getNext().setPrevious(node);
			node.setPrevious(current);
			current.setNext(node);
				
		}
		
	}
	


	@Override
	public String toString() {
		if(isEmpty())
			return "";
		
		String str = "[";
		DoubleLinkListNode<E> current;
		
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



	@Override
	public int indexOf(E data) {
		DoubleLinkListNode<E> current = head;
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
		
		DoubleLinkList<E> newList = new DoubleLinkList<E>();
		DoubleLinkListNode<E> current = head;
		while(current != null) {
			newList.prepend(current.getData());
			current = current.getNext();
		}
		head = newList.getHead();
		tail = newList.getTail();		
	}

	


}
