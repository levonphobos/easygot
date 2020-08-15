<template>
    <div class="text-center">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-sm" :class="(post.type === 'suggest') ? 'btn-success' : 'btn-primary'"
                data-toggle="modal"
                :data-target="`#post-modal-${post.id}`">
            {{post.title}} - {{post.type}}
        </button>

        <!-- Modal -->
        <div class="modal fade" :id="`post-modal-${post.id}`" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">{{post.title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {{post.content}}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PostTypeBtn",
        props: ['post', 'user'],
    }
</script>

<style scoped>

</style>
