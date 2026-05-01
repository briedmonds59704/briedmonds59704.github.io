class Node {
    value: string;
    next: Node | null = null;
    prev: Node | null = null;

    constructor(value: string) {
        this.value = value;
    }
}

class LinkedListGallery {
    head: Node | null = null;
    tail: Node | null = null;
    current: Node | null = null;

    add(imageUrl: string) {
        const newNode = new Node(imageUrl);

        if (!this.head) {
            this.head = this.tail = this.current = newNode;
            return;
        }

        this.tail!.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }

    next() {
        if (this.current?.next) {
            this.current = this.current.next;
        }
        return this.current;
    }

    prev() {
        if (this.current?.prev) {
            this.current = this.current.prev;
        }
        return this.current;
    }
}

// Initialize Wonderland gallery
const gallery = new LinkedListGallery();

// Add images (replace with your Wonderland‑themed art)
gallery.add("https://picsum.photos/id/1011/600/400");
gallery.add("https://picsum.photos/id/1021/600/400");
gallery.add("https://picsum.photos/id/1031/600/400");
gallery.add("https://picsum.photos/id/1041/600/400");

const imgElement = document.getElementById("galleryImage") as HTMLImageElement;

// Show first image
imgElement.src = gallery.current!.value;

function nextImage() {
    const node = gallery.next();
    if (node) imgElement.src = node.value;
}

function prevImage() {
    const node = gallery.prev();
    if (node) imgElement.src = node.value;
}
