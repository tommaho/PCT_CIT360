

public class DoubleLinkListNode<E> {
	
	private E data;
	private DoubleLinkListNode<E> next;
	private DoubleLinkListNode<E> previous;
	
	
	public DoubleLinkListNode(E data, DoubleLinkListNode<E> next, DoubleLinkListNode<E> prev) {
		super();
		this.data = data;
		this.next = next;
		this.previous = prev;
	}
	
	public DoubleLinkListNode() {
		super();
		this.data = null;
		this.next = null;
		this.previous = null;
	}
	
	
	public DoubleLinkListNode(E data) {
		super();
		this.data = data;
		this.next = null;
		this.previous = null;
	}

	public E getData() {
		return data;
	}

	public void setData(E data) {
		this.data = data;
	}

	public DoubleLinkListNode<E> getNext() {
		return next;
	}

	public void setNext(DoubleLinkListNode<E> next) {
		this.next = next;
	}
	
	public void setPrevious(DoubleLinkListNode<E> next) {
		this.previous = next;
	}

	public DoubleLinkListNode<E> getPrevious() {
		return previous;
	}

	

	@Override
	public String toString() {
		return data.toString();
	}


	
	
	
}
