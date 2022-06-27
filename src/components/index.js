import DragDropContainer from './DragDropContainer/index.vue'
import DragDrop from './DragDrop/index.vue'

const components = [DragDropContainer, DragDrop];

const install = function (Vue) {
    components.forEach((component) => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    DragDropContainer,
    DragDrop
};