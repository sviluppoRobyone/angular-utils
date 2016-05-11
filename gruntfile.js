/// <binding ProjectOpened='watch:js, ts:default, ts:demo' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: ["src/*.ts", "Scripts/typings/**/*.ts"],
                outDir: "dist/components",
                watch: "src/*.ts",
                options: {
                    fast:"never",
                    declaration:true
                }
            },
            demo: {
                src: ["demo/demo.ts", "Scripts/typings/**/*.ts"],
                outDir: "demo/",
                watch: "demo/demo.ts",
                options: {
                    fast: "never",
                    declaration: false
                }
            }
        },
        watch: {
            js: {
                files: ["dist/components/*.js", "dist/components/*.d.ts"],
                tasks:["concat:js","concat:ts"]
            }
        },
        concat: {
            options: {
                sourceMap: true
            },
            js: {
                src: ["dist/components/au-core.js", "dist/components/*.js"],
                dest:"dist/au.js"
               
            },
            ts: {
                src: ["dist/components/*.ts"],
                dest: "dist/au.d.ts",
                options: {
                sourceMap: false
    }
            }
        }

        
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["ts"]);
};