<template>
    <div>
        <form @submit.prevent="uploadFile">
            <div class="form-group">
                <label for="exampleFormControlFile1">Upload .doc or .docx File</label>
                <input @change="changeFile" type="file" class="form-control-file" id="exampleFormControlFile1">
                <button class="btn btn-primary" type="submit">Upload</button>
            </div>
        </form>
        <div class="alert alert-danger" role="alert" v-if="errors" v-for="error in errors">
            {{error}}
        </div>
        <div class="alert alert-success" role="alert" v-if="success">
            {{success}}
        </div>
        <div v-if="excel">
            <table class="table">
                <thead class="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" v-for="th in excel[0]">{{th}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(data, index) in excel.slice(1)">
                    <th scope="row">{{index}}</th>
                    <td v-for="row in data">
                        {{row}}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "File",
        data() {
            return {
                file: null,
                success: null,
                errors: [],
                excel: null
            }
        },

        methods: {
            changeFile(e) {
                let obj = new FormData;
                obj.append('file', e.target.files[0]);
                this.file = obj;
            },

            uploadFile() {
                return new Promise((resolve, reject) => {
                    axios.post('/api/read/file', this.file).then(response => {
                        this.excel = response.data;
                        this.success = 'The Excel File Is Downloaded Successfully';
                        this.errors = [];
                    }).catch(err => {
                        this.success = null;
                        this.errors = err.response.data.errors;
                    })
                })
            }
        }
    }
</script>
