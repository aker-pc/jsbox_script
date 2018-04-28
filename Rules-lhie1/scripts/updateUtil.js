function getCurVersion() {
    let version = $file.read("version.fndroid").string
    return version
}

function getLatestVersion(params) {
    $http.get({
        url: 'https://raw.githubusercontent.com/Fndroid/jsbox_script/master/Rules-lhie1/version.fndroid' + '?t=' + new Date().getTime(),
        handler: res => {
            params.handler(res.data)
        }
    })
}

function updateScript(version) {
    let url = 'https://github.com/Fndroid/jsbox_script/blob/master/Rules-lhie1/.output/Rules-lhie1.box?raw=true' + '&t=' + new Date().getTime()
    // let installURL = `jsbox://install?name=${"Rules-lhie1"}&url=${encodeURIComponent(url)}&version=${encodeURIComponent(version)}`
    // $app.openURL(installURL)
    $http.download({
        url: url,
        progress: (writed, total) => {
            if (writed == total) {
                $ui.alert({
                    message: "更新成功，是否重启？",
                    actions: [{
                        title: "Cancel",
                        handler: function () {}
                    }, {
                        title: "OK",
                        handler: function () {
                            $addin.run("Rules-lhie1")
                        }
                    }]
                })
            }
        },
        handler: resp => {
            let box = resp.data
            $addin.save({
                name: "Rules-lhie1",
                data: box
            })
        }
    })
}


module.exports = {
    getCurVersion: getCurVersion,
    getLatestVersion: getLatestVersion,
    updateScript: updateScript
}