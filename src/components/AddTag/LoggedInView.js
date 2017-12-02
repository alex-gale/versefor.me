import React from 'react';

export default class LoggedInView extends React.Component {
  render() {
    return (
      <div className="hidden-container">
        <h1>Hello, {this.props.username}</h1>

        <h2>Add a tag</h2>
        <form className="addtag-form" onSubmit={this.props.handleAddtag}>
          <select className="addtag-select addtag-book" value={this.props.book} onChange={this.props.changeBook}>
            <option value="0">Genesis</option>
            <option value="1">Exodus</option>
            <option value="2">Leviticus</option>
            <option value="3">Numbers</option>
            <option value="4">Deuteronomy</option>
            <option value="5">Joshua</option>
            <option value="6">Judges</option>
            <option value="7">Ruth</option>
            <option value="8">1 Samuel</option>
            <option value="9">2 Samuel</option>
            <option value="10">1 Kings</option>
            <option value="11">2 Kings</option>
            <option value="12">1 Chronicles</option>
            <option value="13">2 Chronicles</option>
            <option value="14">Ezra</option>
            <option value="15">Nehemiah</option>
            <option value="16">Esther</option>
            <option value="17">Job</option>
            <option value="18">Psalms</option>
            <option value="19">Proverbs</option>
            <option value="20">Ecclesiastes</option>
            <option value="21">Song of Songs</option>
            <option value="22">Isaiah</option>
            <option value="23">Jeremiah</option>
            <option value="24">Lamentations</option>
            <option value="25">Ezekiel</option>
            <option value="26">Daniel</option>
            <option value="27">Hosea</option>
            <option value="28">Joel</option>
            <option value="29">Amos</option>
            <option value="30">Obadiah</option>
            <option value="31">Jonah</option>
            <option value="32">Micah</option>
            <option value="33">Nahum</option>
            <option value="34">Habakkuk</option>
            <option value="35">Zephaniah</option>
            <option value="36">Haggai</option>
            <option value="36">Zechariah</option>
            <option value="38">Malachi</option>
            <option value="39">Matthew</option>
            <option value="40">Mark</option>
            <option value="41">Luke</option>
            <option value="42">John</option>
            <option value="43">Acts</option>
            <option value="44">Romans</option>
            <option value="45">1 Corinthians</option>
            <option value="46">2 Corinthians</option>
            <option value="47">Galatians</option>
            <option value="47">Ephesians</option>
            <option value="49">Philippians</option>
            <option value="50">Colossians</option>
            <option value="51">1 Thessalonians</option>
            <option value="52">2 Thessalonians</option>
            <option value="53">1 Timothy</option>
            <option value="54">2 Timothy</option>
            <option value="55">Titus</option>
            <option value="56">Philemon</option>
            <option value="57">Hebrews</option>
            <option value="58">James</option>
            <option value="59">1 Peter</option>
            <option value="60">2 Peter</option>
            <option value="61">1 John</option>
            <option value="62">2 John</option>
            <option value="63">3 John</option>
            <option value="64">Jude</option>
            <option value="65">Revelation</option>
          </select><br />
          <input className="textInput addtag-chapter" type="text" value={this.props.chapter} onChange={this.props.changeChapter} placeholder="Chapter" /><br />
          <input className="textInput addtag-verse" type="text" value={this.props.verse} onChange={this.props.changeVerse} placeholder="Verse" /><br />
          <input className="textInput addtag-tag" type="text" value={this.props.tag} onChange={this.props.changeTag} placeholder="Tag" /><br />
          <p>{this.props.specialMessage}</p>
          <input className="button addtag-submit" type="submit" />
        </form>


        <form className="logout-form" onSubmit={this.props.handleLogout}>
          <input className="button logout-submit" type="submit" value="Logout" />
        </form>
      </div>
    )
  }
}
