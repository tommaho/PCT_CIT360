

public class SingleLinkListNode<E> {
	
	private E data;
	private SingleLinkListNode<E> next;
	
	
	public SingleLinkListNode(E data, SingleLinkListNode<E> next) {
		super();
		this.data = data;
		this.next = next;
	}
	
	public SingleLinkListNode() {
		super();
		this.data = null;
		this.next = null;
	}
	
	
	public SingleLinkListNode(E data) {
		super();
		this.data = data;
		this.next = null;
	}

	public E getData() {
		return data;
	}

	public void setData(E data) {
		this.data = data;
	}

	public SingleLinkListNode<E> getNext() {
		return next;
	}

	public void setNext(SingleLinkListNode<E> next) {
		this.next = next;
	}

	@Override
	public String toString() {
		return data.toString();
	}


	
	
	
}

