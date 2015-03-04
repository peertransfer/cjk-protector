#
# cjkProtector v1.0.0
# Protect inputs/textareas from Chinese, Japanese and Korean characters
# http://peertransfer.github.io/cjkProtector
#

jQuery ->
  $.cjkProtector = (ele, options) ->
    @$ele = $ ele
    @settings = {}
    $wrapperHtml = @$ele.closest 'div'

    defaults =
      errorClass: 'field_with_errors'
      errorMessage: 'Please use latin characters'
      onError: ->
      onSuccess: ->

    hanRegex = /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FCC\uF900-\uFA6D\uFA70-\uFAD9]|[\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD87E[\uDC00-\uDE1D]/
    katakanaRegex = /[\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D]|\uD82C\uDC00/
    hiraganaRegex = /[\u3041-\u3096\u309D-\u309F]|\uD82C\uDC01|\uD83C\uDE00/
    hangulRegex = /[\u1100-\u11FF\u302E\u302F\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/

    allRegex = [hanRegex, katakanaRegex, hiraganaRegex, hangulRegex]

    callCallback = (functionName) => @settings[functionName]()

    showError = =>
      if not $wrapperHtml.hasClass @settings.errorClass
        $wrapperHtml.addClass @settings.errorClass
        $spanWithError = $('<span />').attr('class', 'error')
          .html @settings.errorMessage
        $wrapperHtml.append $spanWithError

      callCallback 'onError'

    hideError = =>
      if $wrapperHtml.hasClass @settings.errorClass
        $wrapperHtml.removeClass @settings.errorClass
        $wrapperHtml.find('span.error').remove()

      callCallback 'onSuccess'

    check = (e) =>
      matches = allRegex.some (regex) => @$ele.val()?.match regex
      if matches then showError() else hideError()

    @init = ->
      @settings = $.extend {}, defaults, options
      @$ele.on 'change keyup paste', check

    @init()
    @

  $.fn.cjkProtector = (options) ->
    return @each ->
      if undefined == $(@).data 'cjkProtector'
        cjkProtector = new $.cjkProtector @, options
        $(@).data 'cjkProtector', cjkProtector
