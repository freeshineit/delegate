<template>
    <div style="padding-top: 100px">
        <button id="delegate">click</button>
        <button id="delegateDestroy">delegation destroy</button>
        <div id="dd">
            <button id="delegate1">click button</button>
            <div id="delegate2">click div</div>
            <span id="delegate3">click span</span>
            <p id="delegate4">click p</p>
            <canvas id="delegate5" style="background-color: black"></canvas>
        </div>
    </div>
</template>

<script>
import delegate from "@skax/delegate";

let delegation = null;
export default {
    name: "Delegate",
    data() {
        return {};
    },
    mounted: () => {
        delegation = delegate(document, "#delegate", "mousedown", (e) => {
            console.log("delegate", e);
        });
        delegate(document, "#delegate1", "click", (e) => {
            console.log("delegate1", e);
        });
        delegate(document, "#delegate2", "click", (e) => {
            console.log("delegate2", e);
        });
        delegate(document, "#delegate3", "click", (e) => {
            console.log("delegate3", e);
        });
        delegate(document, "#delegate4", "click", (e) => {
            console.log("delegate4", e);
        });
        delegate(document, "#delegate5", "click", (e) => {
            console.log("delegate5", e);
        });

        delegate(document, "#delegateDestroy", "mousedown", (e) => {
            console.log("delegateDestroy", e);
            if (delegation) {
                delegation.destroy();
                delegation = null;
            }
        });
    },
    methods: {},
};
</script>
