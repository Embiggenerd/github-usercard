const el = type => document.createElement(type)

const ac = (children, parent ) => {
    for(let child of children) {
        parent.appendChild(child)
    }
}