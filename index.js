
// the main library of this tool
const dfe = require('./dfe.js')
// a config library that does overrides  
const nconf = require('nconf')
// a command line parse. when running "npm run_script" the first two process.argv are "../bin/node" and "index.js" which we drop
const argv = require('minimist')(process.argv.slice(2,process.argv.length))

// command line args that don't hace a -x or --x are collected into an array called '_' so we inspect at the first one
const command = argv._[0]

if( command == "parameters") {
    const template = argv.t
    const properties = argv.c
    const templateParameters = dfe.templateParameters
    const parameters = templateParameters(nconf, properties, template)

    for( const key in parameters ) {
        console.log(key+"="+parameters[key])
    }

} else if ( command == "scmsecret" ) {
    // https://blog.openshift.com/using-ssh-key-for-s2i-builds/
    const sshprivatekey = argv._[1]
    if( sshprivatekey.startsWith('ssh-privatekey=') ) {
        console.log("oc secrets new scmsecret "+sshprivatekey)
        console.log("oc secrets link builder scmsecret")
    } else {
        const msg = "ERROR the second paramaeter should start ssh-privatekey="
        console.error(msg)
        throw new Error("Invalid arguments. "+msg)
    }
} else {
     throw new Error("Unrecognised command: "+command);
}

    
